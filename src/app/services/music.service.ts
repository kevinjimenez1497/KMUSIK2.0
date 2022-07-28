import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as dataArtists from "./artists.json";

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  header = { 'Access-Control-Request-Heaters': '*'} 
  url_server ="https://music-back-seminario.herokuapp.com/"
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getArtists(){
    return fetch( `${this.url_server}artists`, { mode: 'cors', headers: this.header}).then(
      (response) => response.json()
    );
  }

  getArtistsFromJson(){
    return dataArtists;
  }

  getAlbums(){      
    return fetch(`${this.url_server}albums`,{ mode: 'cors', headers: this.header}).then(
      (albums) => albums.json()
    );
  }
  getArtistsTrack(artist_id){
    return fetch(`${this.url_server}tracks/artist/${artist_id}`,{
      mode: 'cors',
      headers: this.header
      }).then(
      (response) => response.json()
    );
  }

  searchTracks(keyword){
    let params = {
      "track":{
        "q": keyword
      }
    }

    return this.http.post(`${this.url_server}search_track`, params, this.httpHeader)

  }
}
