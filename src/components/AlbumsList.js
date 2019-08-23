import React, { Component } from 'react';
import * as Actions from '../store/actions';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import './styles/albumsList.scss';
import { Button, Modal } from 'react-bootstrap';
import EditModal from '../components/EditModal';

class AlbumsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpened: false,
            isDeleteModalOpened: false
        }
    }

    deleteModal(albumId) {
        return (
            <Modal show={ this.state.isDeleteModalOpened }>
                <Modal.Header>Sure?</Modal.Header>
                <Modal.Footer>
                <Button 
                        variant="light"
                        onClick={ () => this.setState({ isDeleteModalOpened: false }) }
                    >
                        Oh no!
                    </Button>
                    <Button 
                        variant="dark"
                        onClick={ () => this.handleDeleteButton(albumId) }
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    handleDeleteButton(albumId) {
        this.props.deleteAlbum(albumId);
        this.setState({ isDeleteModalOpened: false })
    }

    render() {
        return (
                <div className="list">
                    {
                        this.props.albums.map((album, key) =>
                                <div 
                                    key={ key }
                                    className="listItem"
                                >
                                    <div className="listItemInfo">
                                        <p>Name: { album.name }</p>
                                        <p>Artist: { album.artist }</p>
                                        <p>Genre: { album.genre }</p>
                                        <p>Release date: { album.releaseDate }</p>
                                        <p>Label: { album.label }</p>
                                        <p>Price: { album.price }$</p>
                                    </div>
                                    <div className="listItemButtons">
                                        <Button 
                                            variant="outline-danger"
                                            onClick={ () => this.setState({ isDeleteModalOpened: true }) }
                                        >
                                            Delete
                                        </Button>
                                        <Button 
                                            variant="outline-secondary"
                                            onClick={ () => this.setState({ isModalOpened: true }) }
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                    { this.deleteModal(album.id) }
                                    <EditModal 
                                        show={ this.state.isModalOpened } 
                                        album={ album }
                                        onClose={ () => this.setState({ isModalOpened: false }) } 
                                    />
                                </div>
                            )
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsList);
