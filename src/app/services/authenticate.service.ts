import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  header = { 'Access-Control-Request-Heaters': '*'} 
  url_server ="https://music-back-seminario.herokuapp.com/"
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private storage: Storage, private http: HttpClient) { 
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
    //userData.password = btoa(userData.password); // encriptar contraseña
    //return this.storage.set("user", userData) 
    
    let params = {
      "user":userData
    }
    return this.http.post(`${this.url_server}signup`,params,this.httpHeader)
  }

}
