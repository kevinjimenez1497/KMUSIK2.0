import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  validation_messages = {
    email: [
      { type: "required", message: "campo no puede estar vacio" },
      { type: "pattern", message: "correo no valido" }
    ],
    password: [
      { type: "required", message1: "campo no puede estar vacio" }
    ],
    name: [
      { type: "required", message2: "Se requiere al menos 1 nombre" }
    ],
    last_name: [
      { type: "required", message3: "Debe digitar al menos 1 apellido" }
    ]
    
  };

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private storage: Storage,
    private authService: AuthenticateService
  ) {
    this.registerForm = this.formBuilder.group({
      name: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z]+$")
        ])
      ),
      last_name: new FormControl(
        "",
        Validators.compose([
          Validators.required, 
          Validators.pattern("^[a-zA-Z]+$")
        ])
      ),
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
    });
  }

  ngOnInit() {
  }

  register(registerFormValues) {
    this.authService.registerUser(registerFormValues).subscribe((resp: HttpResponse <any>) => {
      this.navCtrl.navigateBack("/login");
    });
  }

  goToLogin() {
    this.navCtrl.navigateBack("/login")
  }
  clearForm(){
    this.registerForm.reset();
  }

}
