import React, { Component } from 'react'

export default class TagList extends Component {
    handleSearch = (event) => {
        this.props.handleSearch(`/tag/${event.target.value}`)
   }
    render() {
        return (
            <div>
                <p><span>{this.props.prefix}</span> Tags</p>
            <div>
            <ul>
               {this.props.tags.tag.map(t => {
                   return <li key={t.name} onClick={this.handleSearch}>{t.name} </li>
               })}
               </ul>
            </div>
            </div>
        )
    }
}
