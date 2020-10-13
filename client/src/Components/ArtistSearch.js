import React, { Component } from 'react'

export default class ArtistSearch extends Component {

    handleSearch = () => {
        this.props.handleSearch(this.props.info, 'artist')
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
