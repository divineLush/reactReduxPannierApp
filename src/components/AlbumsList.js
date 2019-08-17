import React, { Component } from 'react'
import './styles/albumsList.css'

export default class AlbumsList extends Component {
    render() {
        return (
            <div>
                {
                    this.props.albums.map((album, key) => 
                            <div 
                                key={ key }
                                className="item"
                            >
                                <div className="itemInfo">
                                    <p>Name: { album.name }</p>
                                    <p>Artist: { album.artist }</p>
                                    <p>Release date: { album.releaseDate }</p>
                                    <p>Genre: { album.genre }</p>
                                    <p>Price: { album.price }$</p>
                                </div>
                                <div className="itemButtons">
                                    <button>Delete</button>
                                    <button>Edit</button>
                                </div>
                            </div>
                        )
                }
            </div>
        )
    }
}
