import React, { Component } from 'react'

export default class AlbumSearch extends Component {

    handleSearch = () => {
        this.props.handleSearch('/album/Blonde On Blonde?artist=Bob Dylan')
    }

    render() {
        return (
            <div>
                <p onClick={this.handleSearch}>al</p>
            </div>
        )
    }
}
