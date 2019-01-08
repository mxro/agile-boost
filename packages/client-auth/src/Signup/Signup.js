import React, { Component } from 'react';




import SignupForm from './SignupForm';

class Signup extends Component {


    render() {
        let content;
        if (this.props.cookies.get("sessionId")) {
            return (<p>You are already logged in. Session id: {this.props.cookies.get("sessionId")}</p>)
        } else {
            return (<SignupForm cookies={this.props.cookies} />);
        }
    }
}


export default Signup;