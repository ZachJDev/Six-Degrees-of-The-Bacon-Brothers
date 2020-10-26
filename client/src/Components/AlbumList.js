import React, { Component } from 'react'

export default class AlbumList extends Component {
    render() {
        return (
            <div>
                <p><span>{this.props.prefix}</span> albums"</p>
            </div>
        )
    }
}
