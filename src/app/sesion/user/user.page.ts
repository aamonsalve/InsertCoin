import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { LoadingController,  } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  
  listado = [];
  listadoPanel = [];
  userEmail: string;
 
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private AFauth: AngularFireAuth,
    private router: Router,
    public loadingController: LoadingController,
  ) {
    this.initializeItems();
  }
 
  ngOnInit(){
    if(this.authService.email()){
      this.userEmail = this.authService.email().email;
    }
    this.nombre();
  }

  initializeItems() {
    this.listadoPanel = this.listado;
  }

  //mostramos el nombre despues de cargarlo
  nombre() {
    this.presentLoading("Cargando");
    this.authService.user().then((querySnapshot) => {
      this.listado = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        this.listado.push({ id: doc.id, ...doc.data() });
      });
      //console.log(this.listado);
      console.log(this.listado);
      this.listadoPanel = this.listado;
      this.loadingController.dismiss();
    });
  }
  async presentLoading(msg) {
    let myloading = await this.loadingController.create({
      message: msg
    });
    return await myloading.present();
  }

  logout() {
    this.AFauth.auth.signOut().then(() => {
      this.router.navigate(['/desconectar']);
    })
  }
}
