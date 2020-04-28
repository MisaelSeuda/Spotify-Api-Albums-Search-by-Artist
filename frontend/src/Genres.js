import React, { Component } from 'react';

class Genres extends Component {

    printGenres() {
      if (this.props.value) {
        return this.props.value.map((genre, index) =>
          <li key={index}>{genre}</li>
        );
      }
    }
  
    render() {
      return (
        <ul className="Genres">
          {this.printGenres()}
        </ul>
      );
    }
  }

export default Genres;