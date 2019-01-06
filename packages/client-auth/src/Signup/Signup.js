import React, { Component } from 'react';

import { Mutation } from "react-apollo";

import CREATE_USER from './graphql/createuser';


class Signup extends Component {


    render() {
        let input;
        return (<div>
            <h1>Signup</h1>
            <Mutation mutation={CREATE_USER}>
                {(createUser, { data }) => (
                    <div>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                console.log('CLICKED');
                                if (!input.value) {
                                    alert('Please provide an email address');
                                    return;
                                }
                                const sessionId = '123';
                                createUser({
                                    variables: {
                                        userInput: {
                                            email: input.value,
                                            sessionId: sessionId
                                        }
                                    }
                                });
                                input.value = "";
                            }}
                        >
                            <p>Email address</p>
                            <input
                                ref={node => {
                                    input = node;
                                }}
                            />
                            <button type="submit">Sign up</button>
                        </form>
                    </div>
                )}
            </Mutation>
        </div>);
    }
}


export default Signup;