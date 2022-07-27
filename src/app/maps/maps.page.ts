import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  @ViewChild('map')
  mapRef: ElementRef <HTMLElement>;
  newMap: GoogleMap;
  center = {
    lat: 0,
    lng: 0
  }
  markerID ;  
  coordinates: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  async ionViewDidEnter(){
    await this.getCurrentPosition();
    this.watchPosition();
  }


  async createMap(){
    this.newMap = await GoogleMap.create({
      id: 'mapa',
      element: this.mapRef.nativeElement,
      apiKey: environment.googleApikey,
      config: {
        center: this.center,
        zoom: 15,
      }
    })
    this.addMarket(this.center.lat, this.center.lng)
    this.addListeners();
  }


  async getCurrentPosition(){
    const coord = await Geolocation.getCurrentPosition();
    this.center = {
      lat: coord.coords.latitude,
      lng: coord.coords.longitude
    }
    this.createMap(); 
  }

  async addMarket(lat, lng){
    this.markerID = await this.newMap.addMarker({
      coordinate:{
        lat: lat,
        lng: lng
      },
      draggable: true,
      iconUrl: 'assets/images/Icono mapa.png'
    });
  }

  async watchPosition(){
    await Geolocation.watchPosition({},position =>{
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      //console.log(this.center)
      this.setCamera(this.center.lat, this.center.lng);
      this.coordinates.push({coordinate: {
        lat: position.coords.latitude,
        lng: position.coords.latitude
      }
      })
    });
  }

  setCamera(lat: number, lng: number){
    this.removeMarker();
    this.addMarket(lat,lng);
    this.newMap.setCamera({
      coordinate:{
        lat: lat,
        lng: lng
      }
    })
  }

  async removeMarker(id?){
    await this.newMap.removeMarker(id? id : this.markerID)
  }

  async addListeners() {

    await this.newMap.setOnMarkerClickListener( (event) => {
      this.removeMarker(event.markerId)
    })

    await this.newMap.setOnMapClickListener((event) => {
      this.addMarket(event.latitude, event.longitude)
    })
  }
  async showHistory(){
    await this.newMap.addMarkers(this.coordinates)
  }
}
