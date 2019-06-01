import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desconectar',
  templateUrl: './desconectar.page.html',
  styleUrls: ['./desconectar.page.scss'],
})
export class DesconectarPage {

 
  constructor(private router: Router) {
    setTimeout(() => {
      this.inicio();
     }, 6300);
   }

  
  inicio(){
    this.router.navigate(["/inicio-sesion"]);
    
  }

 

}
