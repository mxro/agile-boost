import React, { Component } from 'react';

import { Mutation } from "react-apollo";

import CREATE_USER from './graphql/createuser';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '' };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }


    render() {
        return (
            <Mutation mutation={CREATE_USER}>
                {(createUser, { data }) => (
                    <form onSubmit={event => {

                        event.preventDefault();
                        if (!this.state.email) {
                            alert('Please provide an email address');
                            return;
                        }
                        const sessionId = '123';
                        createUser({
                            variables: {
                                userInput: {
                                    email: this.state.email,
                                    sessionId: sessionId
                                }
                            }
                        });
                        input.value = "";

                    }}>
                        <label>
                            Email:
          <input type="text" value={this.state.email} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>)}
            </Mutation>
        );
    }
}

export default SignupForm;