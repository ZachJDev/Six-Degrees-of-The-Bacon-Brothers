import React, { Component } from 'react'

export default class FirstSearch extends Component {

    handleChange = (event) => {
        this.props.handleFormUpdate(event)
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleSubmit()
    }

    render() {
        return (
            <div>Album1
                <input id="startAlbum"  name="startAlbum" onChange={this.handleChange} value={this.props.startAlbum} type="text"></input>
                Art1
                <input id="startArtist" name="startArtist" onChange={this.handleChange} value={this.props.startArtist} type="text"></input>
                Al2
                <input id="targetAlbum" name="targetAlbum" onChange={this.handleChange} value={this.props.targetAlbum} type="text"></input>
                ar2
                <input id="targetArtist" name="targetArtist" onChange={this.handleChange} value={this.props.targetArtist} type="text"></input>
                <input onClick={this.handleSubmit} type="submit"></input>
            </div>
        )
    }
}
