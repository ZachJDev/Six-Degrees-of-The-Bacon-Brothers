import React, { Component } from "react";
import Current from './Current'
import Graph from './DS/Graph'
import FirstSearch from './FirstSearch'

class SixDegrees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currrentNode: {},
      nodeGraph : new Graph(),
      initialNode : {},
      hasStarted :false,
      target: {},
      startAlbum : 'Blonde on Blonde',
      startArtist : 'Bob Dylan',
      targetAlbum : 'Believe',
      targetArtist : 'Cher'
    };
  }

  handleStart = () => {

  }

  handleInitialSubmit = () => {
    let {startAlbum, startArtist, targetAlbum, targetArtist} = this.state
    const promises = [];
    promises.push(fetch(`/album/${startAlbum}?artist=${startArtist}`));
    promises.push(fetch(`/album/${targetAlbum}?artist=${targetArtist}`));

    Promise.all(promises).then(prs => {
      return prs.map(res => {
        return res.json()
      })
    })
    .then(als => {
      // Setup the initial game state

    })

  }

  handleFormUpdate = (event) => {
    console.log(event.target, event.value)
    this.setState({[event.target.name]:[event.target.value]})
  }

  handleSearch = (searchString) => {
    this.handleSearchUpdate(fetch(searchString));
  };

  handleSearchUpdate = (search) => {
    search.then(res => res.json())
    .then(res => {
      console.log(res)
        
     }) 
  }

  componentDidMount() {

  }

  //

  render() {
   let {startAlbum, startArtist, targetAlbum, targetArtist, currentNode} = this.state

    return (
      <div>
      {this.state.hasStarted ? 
      <Current handleSearch={this.handleSearch} data={this.state.currentNode}/>
        : 
        <FirstSearch startAlbum={startAlbum} startArtist={startArtist} targetAlbum={targetAlbum} targetArtist={targetArtist} handleStart={this.handleStart} handleFormUpdate={this.handleFormUpdate} handleSubmit={this.handleInitialSubmit}/>
      }
      </div>
    );
  }
}

export default SixDegrees;
