import React, { Component } from 'react'

export default class Album extends Component {

    handleClick = (e) => {
        this.props.handleSearch(`album/${e.target.innerText}?artist=${this.props.artist}`)
    }

    render() {
        return (
            <div>
                <p onClick={this.handleClick}>{this.props.album}</p>
            </div>
        )
    }
}
