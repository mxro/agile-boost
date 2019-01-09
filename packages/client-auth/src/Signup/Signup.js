import React, { Component } from 'react';


import SignupForm from './SignupForm';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signedIn: this.props.cookies.get("sessionId") 
        };
    }

    handleSignUp() {
      this.setState({ ...this.state, signedIn: true }); 
      this.render();
    }


    render() {
        let content;
        if (this.state.signedIn) {
            return (<p>You are already logged in. Session id: {this.props.cookies.get("sessionId")}</p>)
        } else {
            return (<SignupForm cookies={this.props.cookies} onSignedUp={this.handleSignUp.bind(this)} />);
        }
    }
}


export default Signup;