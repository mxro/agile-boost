import React, { Component } from 'react';

import { Mutation } from "react-apollo";

import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

import CREATE_BOARD from './graphql/createBoard';

 class CreateBoardForm extends Component {
   constructor(props) {
        super(props);
        this.titleEl = React.createRef();
    }
    render() {
        return (<Mutation mutation={CREATE_BOARD}>

            {(createBoard, { data, loading, error }) => (
                <React.Fragment>
                    <form>
                        <FormGroup>
                            <InputGroup>
                                <FormControl type="text" placeholder="Board title" ref={this.titleEl} />
                                <Button componentClass={InputGroup.Button}
                                    disabled={loading}
                                    onClick={e => {
                                        createBoard({ variables: { boardInput: { title: this.titleEl.current.value, creatorId: this.props.creatorId } } })
                                    }
                                    }
                                >
                                    Create Board
                                            </Button>
                            </InputGroup>
                        </FormGroup>
                    </form>
                    {loading && <p>Creating board ...</p>}
                    {error && <p>Error creating board {error}</p>}
                </React.Fragment>
            )}
        </Mutation>
        )}
};

export default CreateBoardForm;