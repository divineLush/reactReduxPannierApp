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
    switch (action.type) {
        case GET_ALBUMS:
            return {...state, albums: action.payload, loading: false};
        case EDIT_ALBUM:
            return state;
        case ADD_ALBUM:
            return state;
        case DELETE_ALBUM:
            return state;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    albumsReducer
})
  
export default rootReducer;
