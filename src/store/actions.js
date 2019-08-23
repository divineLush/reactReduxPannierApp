import { genres } from '../assets/consts'
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
        releaseDate: moment('1987').format('YYYY'),
        label: 'Combat Records',
        price: 10,
        id: uuid()
    },
    {
        name: 'Harmony Corruption',
        artist: 'Napalm Death',
        genre: genres[2],
        releaseDate: moment('1990').format('YYYY'),
        label: 'Earache',
        price: 10,
        id: uuid()
    },
    {
        name: 'Black Shinig Leather',
        artist: 'Carpathian Forest',
        genre: genres[1],
        releaseDate: moment('1998').format('YYYY'),
        label: 'Avantgarde Music',
        price: 10,
        id: uuid()
    },
    {
        name: 'Left Hand Path',
        artist: 'Entombed',
        genre: genres[0],
        releaseDate: moment('1989').format('YYYY'),
        label: 'Earache',
        price: 10,
        id: uuid()
    },
    {
        name: 'Reek of Putrefaction',
        artist: 'Carcass',
        genre: genres[4],
        releaseDate: moment('1988').format('YYYY'),
        label: 'Earache',
        price: 10,
        id: uuid()
    },
    {
        name: 'Atra Mors',
        artist: 'Evoken',
        genre: genres[7],
        releaseDate: moment('2012').format('YYYY'),
        label: 'Profound Lore Records',
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
        payload: album
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
