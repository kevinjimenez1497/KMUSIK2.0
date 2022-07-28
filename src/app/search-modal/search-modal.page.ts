import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { NavParams } from '@ionic/angular'; 
import { MusicService } from '../services/music.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.page.html',
  styleUrls: ['./search-modal.page.scss'],
})
export class SearchModalPage implements OnInit {

  searching = false;
  text = "Busca una cancion...";
  songs: any;
  song: any;
  currentSongs: HTMLAudioElement;

  constructor(private navParams: NavParams, private musicService: MusicService, private modalController: ModalController) { }

  ngOnInit() {
  }

  CloseModal(){
    this.modalController.dismiss();
  }

  getTracks(keyword){
   // console.log(keyword);
    this.searching = true;
    if (keyword.length > 0 ) {
      this.musicService.searchTracks(keyword).subscribe( async resp => {
        this.songs = resp;
        console.log(this.songs)
        if ( this.songs.length === 0){
          this.text = "No se encontro ninguna cancion"
        }
        this.searching = false;
      });
    }else{
      this.text = "ingrese una palabra para buscar";
      this.songs = [];
    }
  }
  play( song ) {
    if (this. currentSongs) {
      this.pause();
    }
    this.song = song;
    this. currentSongs = new Audio(this.song.preview_url);
    this. currentSongs.play();
    this. currentSongs.addEventListener('ended', () => this.song.playing = false);
    this.song.playing = true;
  }

  pause() {
    this.currentSongs.pause();
    this.song.playing = false;
  }

}
