import gql from "graphql-tag";

export default gql`
  mutation CreateBoard($boardInput: BoardInput!) {
    createBoard(boardInput: $boardInput) {
        _id
    }
  }
    `;