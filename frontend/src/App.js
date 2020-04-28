import React, { Component } from 'react';

import Genres from './Genres';
import Albums from './Albums';

import './Style.css';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {

  constructor() {
    super();
    const params = this.getHashParams();

    const token = params.access_token;

    if (token) {
      spotifyApi.setAccessToken(token);
    }

    this.state = {
      nameSearch: '',
      infArtist: {
        nameArtist: '',
        genres: '',
        imgArtist: '',
        albums: '',
      },
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getAlbumArtist(idArtist) {
    spotifyApi.getArtistAlbums(idArtist)
      .then((response) => {

        const albumImageName = response.items.map(album => ({
          url: album.images[0].url,
          name: album.name,
          type: album.album_group
        })
        );

        this.setState({
          infArtist: {
            nameArtist: this.state.infArtist.nameArtist,
            genres: this.state.infArtist.genres,
            imgArtist: this.state.infArtist.imgArtist,
            albums: albumImageName,
          }
        });

      }
      );
  }

  getArtists(nameArtist) {
    spotifyApi.searchArtists(nameArtist, { limit: 1 })
      .then((response) => {

        const idArtist = response.artists.items[0].id;
        this.getAlbumArtist(idArtist);

        
        console.log(response.artists);

        this.setState({
          infArtist: {
            nameArtist: response.artists.items[0].name,
            genres: response.artists.items[0].genres,
            imgArtist: response.artists.items[0].images[0].url,
          }
        });
      })
      .catch((Error) => {
        alert('Artista não encontrado');
      })

  }

  handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    this.getArtists(this.state.nameSearch)
  }

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });

  }

  render() {

    return (
      <div className="container">

        <p align="center">Make with ♥ by Misael Santos 2020</p>

        <form onSubmit={this.handleSubmit}>
          <label className = "form label">Search your favorite artist and you will see your albums</label>
          <input className = "form input" type="text" placeholder="Search Artist" name="nameSearch" onChange={this.handleInputChange} />
          <button className = "form button">Click</button>
        </form>

        <section className="artist">
          <div>
            <p className="nameArtist">{this.state.infArtist.nameArtist}</p>
            <Genres value={this.state.infArtist.genres} />
          </div>
          <div>
            <img className="imageArtist" src={this.state.infArtist.imgArtist} alt="" />
          </div>
        </section>

        <Albums value={this.state.infArtist.albums} />

      </div>
    );
  }
}

export default App;
