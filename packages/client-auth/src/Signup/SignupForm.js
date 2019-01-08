import React, { Component } from 'react';

import { Mutation } from "react-apollo";

import CREATE_USER from './graphql/createuser';

function uniqueID() {
    function chr4() {
        return Math.random().toString(16).slice(-4);
    }
    return chr4() + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() + chr4() + chr4();
}

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '' };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ email: event.target.value });
    }


    render() {
        return (
            <Mutation mutation={CREATE_USER} onCompleted={data => { }}>
                {(createUser, { data, loading, error }) => (
                    <div>
                        <form onSubmit={event => {

                            event.preventDefault();
                            if (!this.state.email) {
                                alert('Please provide an email address');
                                return;
                            }
                            const sessionId = this.props.sessionId || uniqueID;
                            this.props.cookies.set("sessionId", sessionId);
                            createUser({
                                variables: {
                                    userInput: {
                                        email: this.state.email,
                                        sessionId: sessionId
                                    }
                                }
                            });
                            this.handleChange( {target: { value: ""}}); 

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