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
        let {data} = this.props
        // console.log('data:', data.name)
        return (
            <div>
                {data.artist ? 
                <Artist artist={data.artist} handleSearch={this.handleSearch}/>
                : null
                }
                {data.name ?
                <Album album={data.name} handleSearch={this.handleSearch}/>
                : null
                }
                <Tags tags={data.tags.tag} handleSearch={this.handleSearch}/>
            </div>
        )
    }
}

