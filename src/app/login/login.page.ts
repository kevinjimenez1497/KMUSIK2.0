import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  validation_messages = {
    email: [
      { type: "require", message: "campo no puede estar vacio" },
      { type: "pattern", message: "correo no valido" }
    ],
    password: [
      { type: "require", message1: "campo no puede estar vacio" },
      { type: "minLength", message1: "Contraseña debe tener minimo 6 items"}
    ]
  };
  

  errorMessage: any;


  constructor(private formBuilder: FormBuilder, 
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private storage: Storage) { 

    this.storage.create();

    this.loginForm = this.formBuilder.group({
      
      email: new FormControl(
        "",
        Validators.compose([  
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+$")
        ])
      ),

      password: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
      )
    })

  }

  ngOnInit() {
  }

  loginUser(credentials) {
    this.authService.loginUser(credentials).then( res => {
      this.errorMessage = "";
      this.storage.set("isUserLoggedIn", true)
      this.navCtrl.navigateForward("/menu/home");
    }).catch( err => {
      this.errorMessage = err;
    })
  }

  goToRegister() {
    this.navCtrl.navigateForward("/register");
  }

}
