import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage  {
  validations_form: FormGroup;
  errorMessage: string = '';
  email: string;
  password: string;
 
  constructor(
 
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private router : Router
 
  ) { }
 
  ngOnInit() {
 
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }
 
 
  validation_messages = {
    'email': [
      { type: 'required', message: 'Introduzca un email.' },
      { type: 'pattern', message: 'Introduce un email correcto.' }
    ],
    'password': [
      { type: 'required', message: 'Introduzca una Contraseña.' },
      { type: 'minlength', message: 'Como mínimo 6 carascteres.' }
    ]
  };
 
 
  login()
  {
    this.authService.login(this.email, this.password).then( res =>{
      this.router.navigate(['/home']);
    }).catch(err =>  this.alerta("Error", "los datos son incorrectos o no existe el usuario"));
  }
 
  async alerta(title, text) {
    let alert = await this.alertCtrl.create({
      header: title,
      message: text,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    alert.present(); 
    }
 
}