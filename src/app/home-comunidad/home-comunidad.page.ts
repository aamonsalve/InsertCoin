import { Component} from '@angular/core';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Keyboard } from '@ionic-native/keyboard/ngx';

import { ComunidadService } from '../servicios/comunidad.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { ComunidadPage } from '../modals/comunidad/comunidad.page';


@Component({
  selector: 'app-home-comunidad',
  templateUrl: './home-comunidad.page.html',
  styleUrls: ['./home-comunidad.page.scss'],
})
export class HomeComunidadPage  {
  
  titulo: string = "";
  listadoComunidad = [];
  listadoPanelComunidad = [];
  listadoPanelComunidadMay = [];
  autorEmail :string;

  listado = [];
  listadoPanel = [];

  
  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private comunidad: ComunidadService,
    private keyboard: Keyboard,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private modalContoller:ModalController) {
    this.initializeItems();
    this.nombre();
  }


  initializeItems() {
    this.listadoPanelComunidad = this.listadoComunidad;
  }
 

 /**
     * Se ejecuta cuando la página ha entrado completamente y ahora es la página activa.
     * Carga los datos de todas las paginas y ademas de la rayita y de un loading hasta que cargue los datos
     */
    ionViewDidEnter() {

      /*this.presentLoading("Cargando");*/
  
  
      this.comunidad.leerComunidades(this.titulo).then((querySnapshot) => {
        this.listadoComunidad = [];
        querySnapshot.forEach((doc) => {
          this.listadoComunidad.push({ id: doc.id, ...doc.data() });
        });
        this.listadoPanelComunidad = this.listadoComunidad;
        /* this.loadingController.dismiss();*/
      });

    }


    /**
     * Función para llamar a filtrar, igualamos el destino con lo que se ha escrito, y actualizamos la pagina con ese destino.
     * @param busqueda 
     */
  buscar(busqueda){
    this.titulo= busqueda.srcElement.value;
    this.actualizarPage(this.titulo);
    

    
  }
  actualizarPage(titulo: string) {

    this.comunidad.leerComunidades(titulo).then((querySnapshot) => {
      this.listadoComunidad = [];
      querySnapshot.forEach((doc) => {
        this.listadoComunidad.push({ id: doc.id, ...doc.data() });
      });
      this.listadoPanelComunidad = this.listadoComunidad;
      /* this.loadingController.dismiss();*/
    });
    
      
  }
 

  doRefresh(refresher) {
    this.comunidad.leerComunidades(this.titulo)
      .then(querySnapshot => {
        this.listadoComunidad = [];
        querySnapshot.forEach((doc) => {
          this.listadoComunidad.push({ id: doc.id, ...doc.data() });
        });
        this.listadoPanelComunidad = this.listadoComunidad;
        //llamamos al metodo initializeItem para que recargue 
        //el arraylist con los elementos a buscar
        this.initializeItems();
        refresher.target.complete();
      });
  }


  async presentAlertPrompt() {
    
    const alert = await this.alertCtrl.create({
      header: 'Crear Comunidad',
      inputs: [
        {
          name: 'Titulo',
          type: 'text',
          placeholder: 'Inserte un titulo'
        },
        {
          name: 'Descripcion',
          type: 'text',
          placeholder: 'Escriba descripcion sobre su comunidad'
          
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancelar',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: (data) => {
           if(data.Titulo == '' || data.Descripcion == ''){
            console.log('error');
           }else{
            this.autorEmail = this.listadoPanel[0]["name"];
            this.comunidad.crearComunidad(data.Titulo, this.autorEmail, data.Descripcion);
            this.actualizarPage("");
           }
            

          }
        }
      ]
    });

    await alert.present();
  }



    /**
   * Oculta el teclado nativo al pulsar enter.
   */
  cerrar(){
    this.keyboard.hide();
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


  

 





  async borrarSitio(id, autor){

    const alert = await this.alertCtrl.create({
      header: 'Confirmar borrado',
      message: '¿Estás seguro de que deseas eliminar esta comunidad?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // Ha respondido que no así que no hacemos nada
          }
        },
        {
          text: 'Si',
          handler: () => {
               // AquÍ borramos el sitio en la base de datos
               console.log(id);
               console.log(autor);
               this.autorEmail = this.listadoPanel[0]["name"];
               console.log(this.autorEmail);
               if(autor == this.autorEmail){
                this.comunidad.borrarComunidad(id);
                this.actualizarPage("");
               }else{
                this.alerta("No Borrada", "Solo puede ser borrada por su propietario.");
               }

           }
        }
      ]
    });

    await alert.present();

 }

  /**
   * Abrimos el modal con los datos pasados
   * @param id 
   * @param titulo 
   * @param foto 
   * @param video 
   * @param descripcionC
   */

  abrirModal(id, titulo) {
    this.presentModal(id, titulo);
  }
  

/**
   * Creamos el modal con los datos a mostrar
   * @param id 
   * @param titulo 
   * @param foto 
   * @param video 
   * @param descripcionC
   */

  async presentModal(id: any, titulo: any) {
    const modal = await this.modalContoller.create({
      component: ComunidadPage,
     
      componentProps: { id: id, titulo: titulo}
    });
    
    return await modal.present();
  }

  
}
 