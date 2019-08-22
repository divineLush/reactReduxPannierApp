import React, { Component } from 'react'
import * as Actions from '../store/actions';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import moment from 'moment';
import { genres, format } from '../assets/consts';

var uuid = require('uuid/v1');

class AddModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            isAlertVisible: false,
            name: null,
            artist: '',
            genre: genres[0],
            releaseDate: null,
            label: '',
            price: null,
            id: uuid()
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
        if (this.validateForm()) {
            this.props.addAlbum(album)
            this.setState({ isAlertVisible: false })
            this.props.onClose()
        } else {
            this.setState({ isAlertVisible: true })
        } 
    }

    validateForm() {
        if (this.state.name && this.state.price && this.state.releaseDate) {
            const name = this.state.name.length >= 5 && this.state.name.length <= 40;
            const price = this.state.price > 0;
            const date = moment(this.state.releaseDate) > moment();
            return name && price && date
    
        } else return false
    }

    form() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="Name"
                        onChange={ (e) => { e.preventDefault(); this.setState({ name: e.target.value }) } }
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
                        onChange={ (e) => { e.preventDefault(); this.setState({ releaseDate: moment(e.target.value).format(format) }) } }
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
                        onChange={ (e) => { e.preventDefault(); this.setState({ price: e.target.value }) } }
                    />
                </Form.Group>
            </Form>
        )
    }

    render() {
        return (
            <Modal show={ this.props.isOpen }>
                <Modal.Header>
                    <Modal.Title>{ this.props.title }</Modal.Title>
                    <Alert 
                        show={ this.state.isAlertVisible } 
                        variant="danger"
                    >
                        <Alert.Heading>
                            Please select something different...
                        </Alert.Heading>
                    </Alert>
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
                        onClick={ this.handleAddButton }
                    >
                        Add Album
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
