import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-nintendo-modal',
  templateUrl: './nintendo-modal.page.html',
  styleUrls: ['./nintendo-modal.page.scss'],
})
export class NintendoModalPage implements OnInit {

  video:any;
  id:any; 
  titulo:any;
  descripcionC:any;
  foto:any;
  dangerousVideoUrl: string;
  videoUrl: SafeResourceUrl;
  constructor(
    private modalController:ModalController,
    public navparams:NavParams,
    private sanitizer: DomSanitizer
    ) 
    {
      this.id=this.navparams.get('id');
    this.video=this.navparams.get('video');
    this.titulo=this.navparams.get('titulo');
    this.descripcionC=this.navparams.get('descripcionC');
    this.foto=this.navparams.get('foto');
    this.videoUrl =this.sanitizer.bypassSecurityTrustResourceUrl(this.navparams.get('video')); 
  }

  ngOnInit() {
  }
   /**
   * Método que nos devuelve a la pagina anterior y cuando le demos al boton nos vibre.
   */
  atras(){
    this.modalController.dismiss(null, undefined);
  }
 /**
   * Método que permite reproducir el video ya que sin esto nos diria que no es segura la url
   */
  getSafeUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.navparams.get('video'));     
}



}

