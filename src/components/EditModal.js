import React, { Component } from 'react';
import * as Actions from '../store/actions';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Button, Modal, Alert } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';

class EditModal extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            
        }
    }

    render() {
        return (
            <Modal show={ this.props.show }>
                <Modal.Header>Edit album</Modal.Header>
                <Modal.Body>
                <Formik
                    initialValues={{ name: 'jared' }}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                        }, 1000);
                    }}
                    render={props => (
                        <form onSubmit={props.handleSubmit}>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.name}
                            name="name"
                        />
                        {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                        <button type="submit">Submit</button>
                        </form>
                    )}
                />
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="light"
                        onClick={ this.props.onClose }
                    >
                        Close
                    </Button>
                    <Button 
                        variant="dark"
                        onClick={ this.props.onClose }
                    >
                        Edit album
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

function mapStateToProps(state, props) {
    let path = state.albumsReducer
    return {
        loading: path.loading,
        albums: path.albums,
    }
}
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
