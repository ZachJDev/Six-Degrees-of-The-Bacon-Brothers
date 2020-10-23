import React, { Component } from 'react'

export default class Artist extends Component {

    handleClick = (e) => {
        this.props.handleSearch(`artist/${e.target.innerText}`)
    }
    render() {
        return (
            <div>
                <p onClick={this.handleClick}>{this.props.artist}</p>
            </div>
        )
    }
}
