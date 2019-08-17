import React from 'react';
import { genres } from '../assets/consts';
import AlbumsList from './AlbumsList';
import Header from './Header';
import * as Actions from '../store/actions';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      albums: [
        {
          name: 'Scream Bloody Gore',
          artist: 'Death',
          genre: genres[0]
        },
        {
          name: 'Harmony Corruption',
          artist: 'Napalm Death',
          genre: genres[2]
        },
        {
          name: 'Black Shinig Leather',
          artist: 'Carpathian Forest',
          genre: genres[1]
        }
      ]
    }
  }

  async componentDidMount() {
    await this.props.getAlbums()
  }

  render () {
    return (
        <div>
            <Header />
            <button>Add new album</button>
            <AlbumsList albums={ this.props.albums } />
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
