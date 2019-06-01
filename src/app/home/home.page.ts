import { Component,  ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {  ModalController } from '@ionic/angular';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 
 
  constructor(
    private router: Router,
    private modalContoller:ModalController,
    private toastCtrl: ToastController

  ) { }

  
  seccionPs4(){
    this.router.navigate(["/ps4"]);
  }

  seccionNintendo(){
    this.router.navigate(["/nintendo"]);
  }

  seccionXbox(){
    this.router.navigate(["/xbox"]);
  }

}