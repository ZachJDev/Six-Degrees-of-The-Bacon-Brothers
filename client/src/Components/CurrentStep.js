import React, { Component } from 'react'

export default class CurrentStep extends Component {
    render() {
        return (
            <div>
                <p>{this.props.heading}</p>
                <p>{this.props.subhead}</p>
                <img src={this.props.image}></img>
                
            </div>
        )
    }
}
