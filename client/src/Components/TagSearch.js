import React, { Component } from 'react'

export default class TagSearch extends Component {

    handleSearch = () => {
        this.props.handleSearch(this.props.info, 'tag')
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
