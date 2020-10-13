import React, { Component } from 'react'

export default class Album extends Component {
    render() {
        return (
            <div>
                <p>{this.props.album}</p>
            </div>
        )
    }
}
