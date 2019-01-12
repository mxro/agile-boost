import React, { Component } from 'react';

import { Mutation } from "react-apollo";

import CREATE_USER from './graphql/createuser';


import sessionId from './sessionId';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '' };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ email: event.target.value });
    }

    handleSignedUp(data) {
        this.client.writeData({ data: { email: data.createUser.email } });
        this.client.writeData({ data: { userId: data.createUser._id } });
        this.client.writeData({ data: { isLoggedIn: true } });
        this.props.onSignedUp();
    }
    render() {
        return (
            <Mutation mutation={CREATE_USER} onCompleted={(data) => { this.handleSignedUp(data) }}>
                {(createUser, { client, data, loading, error }) => (
                    <div>
                        <form onSubmit={event => {
                            this.client = client;
                            event.preventDefault();
                            if (!this.state.email) {
                                alert('Please provide an email address');
                                return;
                            }
                            const newSessionId = this.props.sessionId || sessionId();
                            this.props.cookies.set("sessionId", newSessionId);
                            createUser({
                                variables: {
                                    userInput: {
                                        email: this.state.email,
                                        sessionId: newSessionId
                                    }
                                }
                            });
                            this.handleChange({ target: { value: "" } });

                        }}>
                            <label>
                                Email:
          <input type="text" value={this.state.email} onChange={this.handleChange} />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error :( Please try again</p>}
                    </div>
                )}
            </Mutation>
        );
    }
}

export default SignupForm;