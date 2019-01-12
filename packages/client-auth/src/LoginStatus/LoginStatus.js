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
                            client.writeData({ data: { email: '' } });
                            client.writeData({ data: { isLoggedIn: false } });
                            return;
                        }
                        const { data, error } = await client.query({
                            query: LOGIN_QUERY,
                            variables: {
                                sessionId: sessionId
                            }
                        });
                        if (error) {
                            throw new Error(error);
                        }
                        client.writeData({ data: { email: data.email } });
                        client.writeData({ data: { userId: data._id } });
                        client.writeData({ data: { isLoggedIn: true } });

                    };
                    if (sessionId) {
                        login();
                        return <p>Logging in....</p>
                    } else {
                        return <p>Please sign in</p>
                    }
                }
            }
            }
        </Query>)
    }
}


export default LoginStatus;