import React, { Component } from 'react';


import { Query } from 'react-apollo';
import LOGIN_QUERY from './graphql/login';

import gql from "graphql-tag";

const GET_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

class LoginStatus extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<Query query={GET_LOGGED_IN}>
            {({ data, client }) => {
                if (data.isLoggedIn) {
                    return <p>Logged in</p>
                } else {
                    const sessionId = this.props.cookies.get("sessionId");
                    const login = async () => {
                        if (!sessionId) {
                            return;
                        }
                        let error, data;
                        try {
                            const { data, error } = await client.query({
                                query: LOGIN_QUERY,
                                variables: {
                                    sessionId: sessionId
                                }
                            });
                            if (error) {
                                throw new Error(error);
                            }
                            client.writeData({ data: { username: data.user.username } });
                            client.writeData({ data: { userId: data.user._id } });
                            client.writeData({ data: { isLoggedIn: true } });

                        } catch (e) {
                            this.props.cookies.set("sessionId", "");
                            throw new Error(error);
                        }
                    };
                    if (sessionId) {
                        login();
                        return <p>Logging in....</p>
                    } else {
                        client.writeData({ data: { username: '' } });
                        client.writeData({ data: { userId: '' } });
                        client.writeData({ data: { isLoggedIn: false } });
                        return <p>Please sign in</p>
                    }
                }
            }
            }
        </Query>)
    }
}


export default LoginStatus;