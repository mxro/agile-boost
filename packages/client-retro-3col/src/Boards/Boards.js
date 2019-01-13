import React, { Component } from 'react';

import gql from "graphql-tag";

import AssureLoggedIn from 'client-auth/dist/AssureLoggedIn/AssureLoggedIn';
import { Query } from 'react-apollo';
import BoardList from './../BoardList/BoardList';
import CreateBoardForm from './../CreateBoardForm/CreateBoardForm';

const GET_USER_ID = gql`
  {
    userId @client
  }
`;

class Boards extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AssureLoggedIn>
                <h1>Your Boards</h1>
                <Query query={GET_USER_ID} >
                    {
                        ({ data, error }) => {
                            if (error) return <p>Error {error}</p>
                            if (!data.userId) {
                                return "Loading ...";
                            }
                            return (<React.Fragment>
                                <CreateBoardForm creatorId={data.userId}></CreateBoardForm>
                                <BoardList creatorId={data.userId}></BoardList> 
                           </React.Fragment>
                            )

                        }

                    }
                </Query>

            </AssureLoggedIn>
        );
    }
}

export default Boards;