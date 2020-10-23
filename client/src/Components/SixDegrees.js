import React, { Component } from "react";
import Current from './Current'
import Graph from './DS/Graph'
import FirstSearch from './FirstSearch'

class SixDegrees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNode: {},
      nodeGraph : new Graph(),
      initialNode : {},
      hasStarted :false,
      startAlbum : 'Blonde on Blonde',
      startArtist : 'Bob Dylan',
      targetAlbum : 'Believe',
      targetArtist : 'Cher',
      targetNode: {},
    };
  }

  handleStart = () => {

  }

  handleInitialSubmit = () => {
    let {startAlbum, startArtist, targetAlbum, targetArtist} = this.state
    const promises = [];
    promises.push(fetch(`/album/${startAlbum}?artist=${startArtist}`));
    promises.push(fetch(`/album/${targetAlbum}?artist=${targetArtist}`));

    Promise.all(promises)
    .then(prs => {
      return prs.map(res => {
        return res.json()
      })
    })
    .then(jsons => {
      return Promise.all(jsons)
    })
    .then(als => {
      this.setState({currentNode: als[0], targetNode: als[1], hasStarted: true}, () => console.log(this.state));

    })

  }

  handleFormUpdate = (event) => {
    this.setState({[event.target.name]:[event.target.value]})
  }

  handleSearch = (searchString) => {
    console.log(searchString)
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


  render() {
   let {startAlbum, startArtist, targetAlbum, targetArtist, currentNode, toptags} = this.state

    return (
      <div>
      {this.state.hasStarted ? 
      <Current handleSearch={this.handleSearch} {...currentNode.album} type={currentNode.type}/>
        : 
        <FirstSearch startAlbum={startAlbum} startArtist={startArtist} targetAlbum={targetAlbum} targetArtist={targetArtist} handleStart={this.handleStart} handleFormUpdate={this.handleFormUpdate} handleSubmit={this.handleInitialSubmit}/>
      }
      </div>
    );
  }
}

export default SixDegrees;
