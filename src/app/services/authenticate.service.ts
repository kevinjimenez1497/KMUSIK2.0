import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private storage: Storage) { 
    this.storage.create();
  }

  loginUser(credentials) {
    return new Promise((accept, reject) => {
      this.storage.get("user").then((data) => {
        if (
          credentials.email == data.email && 
          credentials.password == atob(data.password) //desencriptar contraseña
        ) {
          accept("Bienvenido");
        } else {
          reject("Ingreso Fallido");
        }
      })
      .catch( err => {
        return reject("No se pudo ingresar")
      });
    });
  }

  registerUser(userData) {
    userData.password = btoa(userData.password); // encriptar contraseña
    return this.storage.set("user", userData)
  }

}
