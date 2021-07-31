import React, { Component } from 'react';
import Artist from './Artist';
import Tracks from './Tracks';
import Footer from './footer'
const Api_Address = 'https://spotify-api-wrapper.appspot.com';
export class App extends Component {
  state = {artistQuery: '', artist: null, tracks: [] };

  //componentDidMount(){
  //this.searchArtist('petatonix');
  //}

  updateArtistQuery = event => {
    console.log('event.target.value', event.target.value);
    this.setState({ artistQuery: event.target.value});
  }
  handleKeyPress = event => {
    if(event.key === 'Enter'){
      this.searchArtist();
    }
  }
  searchArtist = () => {
    console.log('this.state', this.state);
    fetch(`${Api_Address}/artist/${this.state.artistQuery}`)
    .then(response => response.json())
    .then(json => {
      if (json.artists.total > 0) {
        const artist = json.artists.items[0];
        this.setState({
          artist
        });
        fetch(`${Api_Address}/artist/${artist.id}/top-tracks`)
        .then(response => response.json())
        .then(json => this.setState({ tracks: json.tracks}))
        .catch(error => alert(error.message));
      }
    })
    .catch(error => alert(error.message));
  }
  render() {
    console.log('this.state', this.state)
    return (
      <div>
        <h2 className='title-text'>Music of Hearts🤍</h2>
        <input 
          onChange={this.updateArtistQuery} 
          onKeyPress = {this.handleKeyPress}
          placeholder="Search for an artist">
        </input>
        <button onClick={this.searchArtist}>Search</button>
        <Artist artist={this.state.artist}></Artist>
        <Tracks tracks={this.state.tracks}></Tracks>
      </div>
    );
  }
}

export default App;