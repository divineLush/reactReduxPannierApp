import React from 'react';
import AlbumsList from './AlbumsList';
import Header from './Header';
import * as Actions from '../store/actions';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import Modal from './Modal';
import './styles/root.scss';
import Button from 'react-bootstrap/Button';

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDeleteModalOpened: false,
      isAddModalOpened: false
    }
  }

  async componentDidMount() {
    await this.props.getAlbums()
  }

  setDeleteModal(isDeleteModalOpened) {
    this.setState({ isDeleteModalOpened })      
  }

  setAddModal(isAddModalOpened) {
    this.setState({ isAddModalOpened })
  }

  render () {
    return (
        <div>
            <Header />
            <div className="content">
              <div className="contentButton">
                <Button
                  variant="outline-dark" 
                  size="lg" block 
                  onClick={ () => this.setAddModal(true) }
                >
                  Add new album
                </Button>
              </div>
              <Modal 
                isOpen={ this.state.isAddModalOpened } 
                title={ 'Add new album' }
                onClose={ () => this.setAddModal(false) } 
              />
              <AlbumsList albums={ this.props.albums } />
            </div>
        </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Root);
