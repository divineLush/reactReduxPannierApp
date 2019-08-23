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
    let albums = [...newState.albums]
    switch (action.type) {
        case GET_ALBUMS:
            return {...state, albums: action.payload, loading: false};
        case EDIT_ALBUM:
            let index = 0
            for ( let i = 0; i < newState.albums.length; i++ ) {
                if (newState.albums[i].id === action.payload.id) {
                    index = i
                    break
                }
            }
            albums[index] = action.payload
            newState.albums = albums
            return newState;
        case ADD_ALBUM:
            albums.push(action.payload)
            newState.albums = albums
            return newState
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
