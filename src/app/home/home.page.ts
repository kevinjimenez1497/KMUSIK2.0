import { Component } from '@angular/core';
import { MusicService } from '../services/music.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  artists: any;
  artistsFromJson: any;
  
  slideOpt = {
    initialSlide: 1,
    slidesPerView: 3,
    centeredSlides: true,
    speed: 400
  }
  constructor(private musicService: MusicService) {}

  ionViewDidEnter(){
    this.musicService.getArtists().then(listArtist => {
      this.artists = listArtist;
      //console.log(listArtist);
      });
      this.artistsFromJson = this.musicService.getArtistsFromJson();
      console.log(this.artistsFromJson.artists);
      
  }
}
