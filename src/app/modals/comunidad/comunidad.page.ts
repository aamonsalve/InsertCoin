import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AuthService } from 'src/app/servicios/auth.service';
import { LoadingController, } from '@ionic/angular';
import { ComunidadService } from 'src/app/servicios/comunidad.service';
import { mensajes } from 'src/app/servicios/mensaje.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.page.html',
  styleUrls: ['./comunidad.page.scss'],
})
export class ComunidadPage implements OnInit {

  public comunidades: any;

  id: any;
  titulo: any;
  mensaje: [];
  autorEmail: string;
  mensajeEnviar: string;
  botonenviar: any;
  private galeria: any;

  listado = [];
  listadoPanel = [];

  constructor(private keyboard: Keyboard,
    private modalController: ModalController,
    private authService: AuthService,
    private camera: Camera,
    private translate: TranslateService,
    private comunidad: ComunidadService,
    private alertCtrl: AlertController,
    public loadingController: LoadingController,
    public navparams: NavParams) {

    this.id = this.navparams.get('id');
    this.titulo = this.navparams.get('titulo');
    this.mensaje = this.navparams.get('mensajes');

    this.nombre();
  }

  //funcion a la hora que se actualiza la pagina
  ngOnInit() {
    this.mensajeEnviar = "";

    this.galeria = "";
    this.comunidad.getMensajes(this.id).subscribe(comunidades => {
      this.comunidades = comunidades;
    })

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


  /**
  * Oculta el teclado nativo al pulsar enter.
  */
  cerrar() {
    this.keyboard.hide();
  }


  //cerramos el modal que habiamos abierto
  atras() {
    this.modalController.dismiss(null, undefined);
  }


  //funcion para enviar un mensaje 
  enviarMensaje() {

    console.log(this.galeria);
    this.autorEmail = this.listadoPanel[0]["name"];
    console.log(this.autorEmail);
    if (this.mensajeEnviar != "" || this.galeria != undefined) {

      if (this.galeria == undefined) {
        this.galeria = "";
      }
      const mensaje: mensajes = {
        mensaje: this.mensajeEnviar,
        autor: this.autorEmail,
        foto: this.galeria
      }


      this.comunidad.guardarMensaje(mensaje, this.id);

      this.ngOnInit();
    } else {
      this.alerta("No enviado", "Introduza un comentario.");
    }
  }

  /**
     * borra el mensaje seleccionado si somos el propietario
     * @param autor 
     * @param mensaje
     * @param id
     * @param foto 
     */
  async borrarMensaje(autor, mensaje, id, foto) {

    const alert = await this.alertCtrl.create({
      header:  this.translate.instant("Confirmar borrado"),
      message:  this.translate.instant("¿Estás seguro de que deseas eliminar este comentario?"), 
      buttons: [
        {
          text: this.translate.instant("Cancelar"),
          role: 'cancel',
          handler: () => {
            // Ha respondido que no así que no hacemos nada
          }
        },
        {
          text: this.translate.instant("Aceptar"),
          handler: () => {
            // AquÍ borramos el sitio en la base de datos

            console.log(id);
            this.autorEmail = this.listadoPanel[0]["name"];

            if (autor == this.autorEmail) {
              this.comunidad.borrarMensaje(this.id, mensaje, autor, foto);
              console.log("bien")
              this.ngOnInit();
            } else {
              this.alerta( this.translate.instant("No Borrada"),this.translate.instant("Solo puede ser borrada por su propietario."));
            }

          }
        }
      ]
    });

    await alert.present();

  }

  /**
     * Alert que creamos para pasarle un titulo y texto
     * @param title 
     * @param text 
     */
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



  /**
* abrimos la galeria para elegir una foto
*/
  fotoGaleria() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetHeight: 600,
      targetWidth: 600
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.galeria = base64Image;
    }, (err) => {
      // Handle error
    });
  }

}
