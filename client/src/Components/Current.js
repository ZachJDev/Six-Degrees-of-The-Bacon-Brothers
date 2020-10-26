import React, { Component } from 'react'
import CurrentStep from './CurrentStep'
import AlbumList from './AlbumList'
import TagList from './TagList'
import ArtistList from './AristList'

export default class Current extends Component {
    constructor(props) {
        super(props);
    }

    handleSearch = (searchUrl) => {
        this.props.handleSearch(searchUrl)
    }
    render() {
       let {artist, name,  tags, type} = this.props
       console.log(this.props)
       let image = this.props.image ? this.props.image[2]["#text"] : '';
       let heading = this.props.name
       let subheading = this.props.artist
       
        // determine which lists to show
        let prefix = type === 'tag' ? 'Top' : 'Similar';
        let display;
        if(type !== 'album') {
            display = (
                <div>
                <AlbumList prefix={prefix} />
                <ArtistList prefix={prefix} />
                <TagList tags={tags} prefix={prefix} handleSearch={this.handleSearch}/>
                </div>
            )
        } else {
            display = (
                <div>
                    <TagList tags={tags} prefix={'Top Album'} handleSearch={this.handleSearch}/>
                </div>
            )
        }

        return (
            <div>
                <CurrentStep image={image} heading={heading} subhead={subheading} />
                {display}

            </div>
        )
    }
}

