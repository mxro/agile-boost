import gql from "graphql-tag";

export default gql`
    query Login($sessionId: String!) {
        user(sessionId: $sessionId) {
            _id
            email
        }   
    }`;