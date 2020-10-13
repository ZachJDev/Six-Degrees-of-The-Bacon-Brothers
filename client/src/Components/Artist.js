import React, { Component } from 'react'

export default class Artist extends Component {
    render() {
        return (
            <div>
                <p>{this.props.artist}</p>
            </div>
        )
    }
}
