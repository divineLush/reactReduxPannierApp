import { genres, format } from '../assets/consts'
import moment from 'moment'

export const GET_ALBUMS = 'GET_ALBUMS'
export const EDIT_ALBUM = 'EDIT_ALBUM'
export const ADD_ALBUM = 'ADD_ALBUM'
export const DELETE_ALBUM = 'DELETE_ALBUM'

var uuid = require('uuid/v1');

const albums = [
    {
        name: 'Scream Bloody Gore',
        artist: 'Death',
        genre: genres[0],
        releaseDate: moment().format(format),
        label: 'Earache',
        price: 10,
        id: uuid()
    },
    {
        name: 'Harmony Corruption',
        artist: 'Napalm Death',
        genre: genres[2],
        releaseDate: moment().format(format),
        label: 'Earache',
        price: 10,
        id: uuid()
    },
    {
        name: 'Black Shinig Leather',
        artist: 'Carpathian Forest',
        genre: genres[1],
        releaseDate: moment().format(format),
        label: 'Earache',
        price: 10,
        id: uuid()
    }
]

export function getAlbums() {
    return (dispatch) => {
      setTimeout(() => {
        const payload  = albums
        dispatch({ type: GET_ALBUMS, payload })
      }, 2000);
    }
}

export function editAlbum(album) {
    return {
        type: EDIT_ALBUM,
        payload: { album }
    }
}

export function addAlbum(album) {
    return {
        type: ADD_ALBUM,
        payload: album
    }
}

export function deleteAlbum(albumId) {
    return {
        type: DELETE_ALBUM,
        payload: albumId
    }
}
