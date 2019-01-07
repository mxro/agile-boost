import React, { Component } from 'react';

import { Mutation } from "react-apollo";

import CREATE_USER from './graphql/createuser';


import SignupForm from './SignupForm';

class Signup extends Component {


    render() {
        return (<SignupForm />);
    }
}


export default Signup;