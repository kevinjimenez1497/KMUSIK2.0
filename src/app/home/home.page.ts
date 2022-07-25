import { Component } from '@angular/core';
import { MusicService } from '../services/music.service';
import {ModalController} from '@ionic/angular';
import {SongsModalPage } from '../songs-modal/songs-modal.page';   


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  artists: any;
  artistsFromJson: any;
  albums: any;
  
  slideOpt = {
    initialSlide: 1,
    slidesPerView: 3,
    centeredSlides: true,
    speed: 400
  }
  constructor(private musicService: MusicService, private modalController: ModalController) {}

  ionViewDidEnter(){
    //artistas externos
    this.musicService.getArtists().then(listArtist => {
      this.artists = listArtist;
      //console.log(this.artists);
      });
    //artistas json local
      this.artistsFromJson = this.musicService.getArtistsFromJson().artists;
      console.log('get artistas',this.artistsFromJson.artists);

      //albums desde api

      this.musicService.getAlbums().then(listAlbums =>{
        this.albums = listAlbums;
        //console.log('get albums',this.albums)
      })  
    }
    async showSongs(artist){
      modal.present();
      const songs = await this.musicService.getArtistsTrack(artist.id);
      const modal = await this.modalController.create({
        component: SongsModalPage,
        componentProps: {
          songs: songs,
          artist: artist.name
        }
      });
     
    }
}
