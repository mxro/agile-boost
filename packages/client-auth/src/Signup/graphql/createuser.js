import gql from "graphql-tag";

export default gql`
    mutation CreateUser($userInput: UserInput!) {
        createUser(userInput: $userInput) {
           _id
           username 
     }
  }
`;