import React, { Component } from 'react';

import { Mutation } from "react-apollo";

import CREATE_USER from './graphql/createuser';


import sessionId from './sessionId';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ username: event.target.value });
    }

    handleSignedUp(data) {
        this.client.writeData({ data: { username: data.createUser.username } });
        this.client.writeData({ data: { userId: data.createUser._id } });
        this.client.writeData({ data: { isLoggedIn: true } });
        if (this.props.onSignedUp) {
            this.props.onSignedUp();
        }
    }
    render() {
        return (
            <Mutation mutation={CREATE_USER} onCompleted={(data) => { this.handleSignedUp(data) }}>
                {(createUser, { client, data, loading, error }) => (
                    <div>
                        <form onSubmit={event => {
                            this.client = client;
                            event.preventDefault();
                            if (!this.state.username) {
                                alert('Please provide a username');
                                return;
                            }
                            const newSessionId = this.props.sessionId || sessionId();
                            this.props.cookies.set("sessionId", newSessionId);
                            createUser({
                                variables: {
                                    userInput: {
                                        username: this.state.username,
                                        sessionId: newSessionId
                                    }
                                }
                            });
                            this.handleChange({ target: { value: "" } });

                        }}>
                            <label>
                                Username:
          <input type="text" value={this.state.username} onChange={this.handleChange} />
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