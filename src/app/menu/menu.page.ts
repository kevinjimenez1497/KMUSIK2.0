import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private menu: MenuController,
    private navCtrl: NavController,
    //private storage: Storage 
    ) { 
      //this.storage.create();
    }

  ngOnInit() {
  }

  closeMenu() {
    this.menu.close();
  }

  logout() {
    //console.log("Funcion para cerrar sesion")
    //this.storage.set("iUserLoggedIn",false)
    this.navCtrl.navigateForward("/login");
  }
  goToSettings(){
    this.navCtrl.navigateRoot("menu/settings");
    this.menu.close();
  }
  goToHome(){
    this.navCtrl.navigateRoot("menu/home");
    this.menu.close();
  }
  goToMaps(){
    this.navCtrl.navigateRoot("menu/maps");
    this.menu.close();
  }

}
