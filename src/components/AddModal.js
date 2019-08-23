import React, { Component } from 'react';
import * as Actions from '../store/actions';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import moment from 'moment';
import { genres, format } from '../assets/consts';

var uuid = require('uuid/v1');

class AddModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: null,
            artist: '',
            genre: genres[0],
            releaseDate: null,
            label: '',
            price: null,
            id: uuid(),
            isFormValid: false,
            isNameValid: false,
            isPriceValid: false,
            isReleaseDateValid: false,
        }
    }

    handleAddButton = () => {
        const album = {
            name: this.state.name,
            artist: this.state.artist,
            genre: this.state.genre,
            releaseDate: this.state.releaseDate,
            label: this.state.label,
            price: this.state.price,
            id: this.state.id
        }
        this.props.addAlbum(album)
        this.props.onClose() 
    }

    validateForm() {
        this.setState({ 
            isFormValid: this.state.isNameValid 
                && this.state.isPriceValid 
                && this.state.isReleaseDateValid       
        })
    }

    validateName() {
        const valid = this.state.name.length >= 5 && this.state.name.length <= 40;
        this.setState({ isNameValid: valid }, this.validateForm())
    }

    validatePrice() {
        const valid = this.state.price > 0;
        this.setState({ isPriceValid: valid }, this.validateForm())
    }

    validateReleaseDate() {
        const valid = moment(this.state.releaseDate).format(format) > moment().format(format);
        this.setState({ isReleaseDateValid: valid }, this.validateForm())
    }

    form() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="Name"
                        onChange={ (e) => { e.preventDefault(); this.setState({ name: e.target.value }, () => this.validateName()) } }
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Artist</Form.Label>
                    <Form.Control
                        name="Artist"
                        onChange={ (e) => { e.preventDefault(); this.setState({ artist: e.target.value }) } }
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Genre</Form.Label>
                    <Form.Control
                        as="select"
                        name="Genre"
                        onChange={ (e) => { e.preventDefault(); this.setState({ genre: e.target.value }) } }
                    >
                        {
                            genres.map((genre, key) =>
                                    <option key={ key }>{ genre }</option>
                                )
                        }
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Release Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="ReleaseDate"
                        onChange={ (e) => { e.preventDefault(); this.setState({ releaseDate: moment(e.target.value).format(format) }, () => this.validateReleaseDate()) } }
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Label</Form.Label>
                    <Form.Control
                        name="Label"
                        onChange={ (e) => { e.preventDefault(); this.setState({ label: e.target.value }) } }
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="Price"
                        onChange={ (e) => { e.preventDefault(); this.setState({ price: e.target.value }, () => this.validatePrice()) } }
                    />
                </Form.Group>
            </Form>
        )
    }

    render() {
        return (
            <Modal show={ this.props.show }>
                <Modal.Header>
                    <Modal.Title>Add new album</Modal.Title>
                </Modal.Header>
                <Modal.Body>{ this.form() }</Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="light"
                        onClick={ this.props.onClose }
                    >
                        Close
                    </Button>
                    <Button 
                        variant="dark"
                        disabled={ !this.state.isFormValid }
                        onClick={ this.handleAddButton }
                    >
                        Add album
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

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);
