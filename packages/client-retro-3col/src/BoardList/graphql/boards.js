import gql from "graphql-tag";

export default gql`
    query Boards($creatorId: String!) {
        boards(creatorId: $creatorId) {
            _id
            title 
        }   
    }`;