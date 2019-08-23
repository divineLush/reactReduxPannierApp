import React from 'react';
import AlbumsList from './AlbumsList';
import * as Actions from '../store/actions';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import AddModal from './AddModal';
import './styles/root.scss';
import Button from 'react-bootstrap/Button';

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAddModalOpened: false,
      isDeleteModalOpened: false
    }
  }

  async componentDidMount() {
    await this.props.getAlbums()
  }

  render () {
    return (
        <div>
            <div className="content">
              <div className="contentButton">
                <Button
                  variant="outline-dark"
                  size="lg"  
                  onClick={ () => this.setState({ isAddModalOpened: true }) }
                >
                  Add new album
                </Button>
              </div>
              <AddModal
                show={ this.state.isAddModalOpened } 
                onClose={ () => this.setState({ isAddModalOpened: false }) } 
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
