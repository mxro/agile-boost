import React, { Component } from 'react';


import { Query } from 'react-apollo';

import gql from "graphql-tag";


const GET_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

class AssuredLoggedIn extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Query query={GET_LOGGED_IN}>
                {({ data, client }) => {
                    if (data.isLoggedIn) {
                        return (<React.Fragment>{this.props.children}</React.Fragment>);
                    } else {
                        return <p>Please sign in first.</p>
                    }
                }}
            </Query>
        );
    }
}

export default AssuredLoggedIn; 