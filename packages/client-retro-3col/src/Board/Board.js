import React, { Component } from 'react';

import gql from "graphql-tag";

import AssureLoggedIn from 'client-auth/dist/AssureLoggedIn/AssureLoggedIn';
import { Query } from 'react-apollo';

const GET_USER_ID = gql`
  {
    userId @client
  }
`;

class Board extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AssureLoggedIn>
                <h1>Your Board</h1>
                <Query query={GET_USER_ID} >
                    {
                        ({ data, error }) => {
                            if (error) return <p>Error {error}</p>
                            if (!data.userId) {
                                return "Loading ...";
                            }
                            return (<p></p>
                            )

                        }

                    }
                </Query>

            </AssureLoggedIn>
        );
    }
}

export default Board;