import { Injectable } from '@angular/core';
import * as dataArtists from "./artists.json";

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  header = { 'Access-Control-Request-Heaters': '*'} 
  
  constructor() { }

  getArtists(){
    return fetch("https://jsonplaceholder.typicode.com/users").then(
      (response) => response.json()
    );
  }

  getArtistsFromJson(){
    return dataArtists;
  }

  getAlbums(){      
    return fetch("https://music-back-seminario.herokuapp.com/albums",{
      mode: 'cors',
      headers: this.header
      }).then(
      (response) => response.json()
    );
  }
  getArtistsTrack(artist_id){
    return []
  }

}
