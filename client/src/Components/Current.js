import React, { Component } from 'react'
import Artist from './Artist'
import Album from './Album'
import Tags from './Tags'

export default class Current extends Component {
    constructor(props) {
        super(props);
    }

    handleSearch = (source, to) => {
        this.props.handleSearch(source, to)
    }
    render() {
       let {artist, name, tags} = this.props
        console.log(this.props.tags )
        return (
            <div>
                {artist ? 
                <Artist artist={artist} handleSearch={this.handleSearch}/>
                : null
                }
                {name ?
                <Album album={name} handleSearch={this.handleSearch}/>
                : null
                }{ tags ?
                <Tags tags={tags} handleSearch={this.handleSearch}/> : null}
            </div>
        )
    }
}

