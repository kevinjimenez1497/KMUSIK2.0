import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular'; 
import { ModalController} from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage implements OnInit {

  artist: string;
  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.artist =this.navParams.data.artist;
  }

  CloseModal(){
    this.modalController.dismiss();
  }
}
