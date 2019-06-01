import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
   public  email : string;
  public   name : string;
  public password : string;
  userEmail = [];

 
  validation_messages = {
    'name': [
      { type: 'required', message: 'Introduzca el nombre.' },
      { type: 'pattern', message: 'Como mínimo 1 carascteres.' }

    ],
   'email': [
     { type: 'required', message: 'Introduzca un email.' },
     { type: 'pattern', message: 'Introduce un email correcto.' }
   ],
   'password': [
     { type: 'required', message: 'Introduzca una Contraseña.' },
     { type: 'minlength', message: 'Como mínimo 6 carascteres.' }
   ]
 };
 
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public loadingController: LoadingController,
    private router : Router
  ) {
    
  }
 
  ngOnInit( ){
    
    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.minLength(1),
        Validators.required,
      ])),
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

  nombre() {
    this.presentLoading("Cargando");
    this.authService.getName(this.name).then((querySnapshot) => {
      this.userEmail = [];
      querySnapshot.forEach((doc) => {
        this.userEmail.push({ id: doc.id, ...doc.data() });
      });
     
      this.loadingController.dismiss();
    });
  }

  async presentLoading(msg) {
    let myloading = await this.loadingController.create({
      message: msg
    });
    return await myloading.present();
  }
  
  Registrar(){
    this.presentLoading("Cargando");
    this.authService.getName(this.name).then((querySnapshot) => {
      this.userEmail = [];
      querySnapshot.forEach((doc) => {
        this.userEmail.push({ id: doc.id, ...doc.data() });
      });
     
      this.loadingController.dismiss();
    

    console.log(this.userEmail);


      if(this.userEmail < [1]){
        this.authService.register(this.email, this.password,this.name).then( auth => {
          this.router.navigate(['home'])
          console.log(auth)
        }).catch(err => console.log(err))
       
    }
    else{
      this.alerta("No creado", "Ya existe ese usuario.");
      
    }
  });
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
