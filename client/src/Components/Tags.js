import React, { Component } from 'react'

export default class Tags extends Component {
    render() {
        console.log(this.props.tags.tag)
        return (
            <div>
            <ul>
               {this.props.tags.tag.map(t => {
                   return <li key={t.name}>{t.name}</li>
               })}
               </ul>
            </div>
        )
    }
}
