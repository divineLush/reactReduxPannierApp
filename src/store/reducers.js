import { combineReducers } from 'redux';
import { 
    GET_ALBUMS, 
    EDIT_ALBUM, 
    ADD_ALBUM, 
    DELETE_ALBUM 
} from './actions';

let albumsState = {
    loading: true,
    albums: []
}

const albumsReducer = (state = albumsState, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_ALBUMS:
            return {...state, albums: action.payload, loading: false};
        case EDIT_ALBUM:
            return state;
        case ADD_ALBUM:
            newState.albums.push(action.payload)
            return newState;
        case DELETE_ALBUM:
            newState.albums = newState.albums.filter(album => album.id !== action.payload)
            return newState;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    albumsReducer
})
  
export default rootReducer;
