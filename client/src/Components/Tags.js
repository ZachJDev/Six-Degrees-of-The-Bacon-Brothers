import React, { Component } from 'react'

export default class Tags extends Component {

    handleSearch = (event) => {
         this.props.handleSearch(`/tag/${event.target.value}`)
    }
    render() {
        return (
            <div>
            <ul>
               {this.props.tags.tag.map(t => {
                   return <li key={t.name} onClick={this.handleSearch}>{t.name} </li>
               })}
               </ul>
            </div>
        )
    }
}
