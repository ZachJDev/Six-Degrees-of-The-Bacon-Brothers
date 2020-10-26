import React, { Component } from 'react'

export default class AristList extends Component {
    render() {
        return (
            <div>
                <p><span>{this.props.prefix}</span> Artists</p>
            </div>
        )
    }
}
