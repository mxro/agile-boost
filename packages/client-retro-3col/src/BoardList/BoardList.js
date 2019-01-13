
import React, { Component } from 'react';


import BOARDS from './graphql/boards';
import { Query } from 'react-apollo';


class BoardList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Query query={BOARDS} variables={{ creatorId: this.props.creatorId }} pollInterval={500} >
                {
                    ({ data, error, loading }) => {
                        if (loading) return <p>Loading ...</p>;
                        if (error) return <p>Cannot load boards: ${error}</p>;
                        const boards = data.boards.map((board) => {
                            return <p><a href='#'>{board.title}</a></p>
                        })
                        return (<React.Fragment>
                            <p>Board count: {data.boards.length}</p>
                            {boards}
                        </React.Fragment>)
                    }
                }

            </Query>
        );
    }
}

export default BoardList;