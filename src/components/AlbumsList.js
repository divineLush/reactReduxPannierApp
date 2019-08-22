import React, { Component } from 'react';
import * as Actions from '../store/actions';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import './styles/albumsList.scss';
import Button from 'react-bootstrap/Button';
import EditModal from '../components/EditModal';

class AlbumsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpened: false
        }
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
                                            onClick={ () => this.props.deleteAlbum(album.id) }
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
