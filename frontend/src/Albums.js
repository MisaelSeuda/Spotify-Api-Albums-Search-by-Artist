import React, { Component } from 'react';

class Albums extends Component {

    printAlbums() {
      if (this.props.value) {
        return this.props.value.map((album, index) =>
          <div className="divImageAlbum" key={index}>
            <img className="imgAlbum" key={album.url.id} title={album.type} src={album.url} alt="" />
              <p key={album.name.id}>{album.name}</p>
          </div>
        );
      }
    }
  
    render() {
  
      return (
        <section className="imageAlbums">
          {this.printAlbums()}
        </section>
      );
    }
  }

export default Albums;