import React, { Component } from 'react'

export default class Tags extends Component {
    render() {
        return (
            <div>
            <ul>
               {this.props.tags.map(t => {
                   return <li key={t.name}>{t.name}</li>
               })}
               </ul>
            </div>
        )
    }
}
