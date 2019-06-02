import { Component, ViewChild } from '@angular/core';
import { IonSlides, IonInfiniteScroll, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Ps4Service } from 'src/app/servicios/ps4.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Ps4ModalPage } from '../../modals/ps4-modal/ps4-modal.page';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';




@Component({
  selector: 'app-ps4',
  templateUrl: './ps4.page.html',
  styleUrls: ['./ps4.page.scss'],
})
export class Ps4Page {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: IonSlides;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  enlace: string
  private tabs = ["selectTab(0)", "selectTab(1)"];
  private category: any = "0";
  private ntabs = 2;
  private SwipedTabsIndicator: any = null;

  Titulo: string = "";
  TituloJuegos: string = "";
  listadoPs4Noticias = [];
  listadoPanelPs4Noticias = [];
  listadoPs4Juegos = [];
  listadoPanelPs4Juegos = [];



  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private Ps4: Ps4Service,
    private sanitizer: DomSanitizer,
    private keyboard: Keyboard,
    private modalContoller: ModalController) {
    this.initializeItems();
  }

  /**
   * Se ejecuta cuando la página está a punto de entrar y convertirse en la página activa.
   */
  ionViewWillEnter() {
    this.category = "0";
    this.SwipedTabsSlider.length().then(l => {
      this.ntabs = l;
    });
  }

  /**
   * Actualiza la categoría que esté en ese momento activa.
   * @param cat 
   */
  updateCat(cat: Promise<any>) {
    cat.then(dat => {
      this.category = dat;
      this.category = +this.category;
    });
  }

  initializeItems() {
    this.listadoPanelPs4Noticias = this.listadoPs4Noticias;
    this.listadoPanelPs4Juegos = this.listadoPanelPs4Juegos;
  }

  /**
   * Método que permite actualizar el indicado cuando se cambia de slide.
   */
  updateIndicatorPosition() {
    this.SwipedTabsSlider.getActiveIndex().then(i => {
      if (this.ntabs > i) {  // this condition is to avoid passing to incorrect index
        this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (i * 100) + '%,0,0)';
      }
    });
  }

  /**
   * Método que anima la "rayita" mientras nos estamos deslizando por el slide.
   */
  animateIndicator(e) {
    if (this.SwipedTabsIndicator)
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' +
        ((e.target.swiper.progress * (this.ntabs - 1)) * 100) + '%,0,0)';
  }
  /**
     * Se ejecuta cuando la página ha entrado completamente y ahora es la página activa.
     * Carga los datos de todas las paginas y ademas de la rayita y de un loading hasta que cargue los datos
     */
  ionViewDidEnter() {

    this.SwipedTabsIndicator = document.getElementById("indicator");
    /*this.presentLoading("Cargando");*/


    this.Ps4.leePs4Noticias(this.Titulo).then((querySnapshot) => {
      this.listadoPs4Noticias = [];
      querySnapshot.forEach((doc) => {
        this.listadoPs4Noticias.push({ id: doc.id, ...doc.data() });
      });
      this.listadoPanelPs4Noticias = this.listadoPs4Noticias;
      /* this.loadingController.dismiss();*/
    });


    this.Ps4.leePs4Juegos(this.TituloJuegos).then((querySnapshot) => {
      this.listadoPs4Juegos = [];
      querySnapshot.forEach((doc) => {
        this.listadoPs4Juegos.push({ id: doc.id, ...doc.data() });
      });
      this.listadoPanelPs4Juegos = this.listadoPs4Juegos;
      /* this.loadingController.dismiss();*/
    });
  }

  /**
     * Función para llamar a filtrar
     * @param busqueda 
     */
  buscar(busqueda) {
    this.Titulo = busqueda.srcElement.value;
    this.TituloJuegos = busqueda.srcElement.value;
    this.actualizarPage(this.Titulo, this.TituloJuegos);
  }


  /**
     * Actualiza la pagina segun si  le pasamos un parametro o no
     * @param Titulo 
     * @param TituloJuegos 
     */
  actualizarPage(Titulo: string, TituloJuegos: string) {

    this.Ps4.leePs4Noticias(Titulo.toUpperCase()).then((querySnapshot) => {
      this.listadoPs4Noticias = [];
      querySnapshot.forEach((doc) => {
        this.listadoPs4Noticias.push({ id: doc.id, ...doc.data() });
      });
      this.listadoPanelPs4Noticias = this.listadoPs4Noticias;
      /* this.loadingController.dismiss();*/
    });
    this.Ps4.leePs4Juegos(TituloJuegos).then((querySnapshot) => {
      this.listadoPs4Juegos = [];
      querySnapshot.forEach((doc) => {
        this.listadoPs4Juegos.push({ id: doc.id, ...doc.data() });
      });
      this.listadoPanelPs4Juegos = this.listadoPs4Juegos;
      /* this.loadingController.dismiss();*/
    });

  }

  /**
      * funcion para refrescar la ventana cunado hagamos la funcion
      * @param refresher 
      */
  doRefresh(refresher) {
    this.Ps4.leePs4Noticias(this.Titulo)
      .then(querySnapshot => {
        this.listadoPs4Noticias = [];
        querySnapshot.forEach((doc) => {
          this.listadoPs4Noticias.push({ id: doc.id, ...doc.data() });
        });
        this.listadoPanelPs4Noticias = this.listadoPs4Noticias;
        //llamamos al metodo initializeItem para que recargue 
        //el arraylist con los elementos a buscar
        this.initializeItems();
        refresher.target.complete();
      });

    this.Ps4.leePs4Juegos(this.TituloJuegos)
      .then(querySnapshot => {
        this.listadoPs4Juegos = [];
        querySnapshot.forEach((doc) => {
          this.listadoPs4Juegos.push({ id: doc.id, ...doc.data() });
        });
        this.listadoPanelPs4Juegos = this.listadoPs4Juegos;
        //llamamos al metodo initializeItem para que recargue 
        //el arraylist con los elementos a buscar
        this.initializeItems();
        refresher.target.complete();
      });
  }

  atras() {
    this.router.navigate(["/home"]);
  }

  /**
 * Oculta el teclado nativo al pulsar enter.
 */
  cerrar() {
    this.keyboard.hide();
  }

  /**
  * alert que nos muestra que esta cargando
  * @param msg 
  */
  async presentLoading(msg) {
    let myloading = await this.loadingController.create({
      message: msg
    });
    return await myloading.present();
  }


  /**
   * Abrimos el modal con los datos pasados
   * @param id 
   * @param titulo 
   * @param foto 
   * @param video 
   * @param descripcionC
   */

  abrirModal(id, titulo, foto, video, descripcionC) {
    this.presentModal(id, titulo, foto, video, descripcionC);
  }


  /**
     * Creamos el modal con los datos a mostrar
     * @param id 
     * @param titulo 
     * @param foto 
     * @param video 
     * @param descripcionC
     */

  async presentModal(id: any, titulo: any, foto: any, video: any, descripcionC: any) {
    const modal = await this.modalContoller.create({
      component: Ps4ModalPage,

      componentProps: { id: id, titulo: titulo, foto: foto, video: video, descripcionC: descripcionC }
    });

    return await modal.present();
  }



}