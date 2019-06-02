import { Component, ViewChild } from '@angular/core';
import { IonSlides, IonInfiniteScroll, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NintendoService } from 'src/app/servicios/nintendo.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { NintendoModalPage } from 'src/app/modals/nintendo-modal/nintendo-modal.page';


@Component({
  selector: 'app-nintendo',
  templateUrl: './nintendo.page.html',
  styleUrls: ['./nintendo.page.scss'],
})
export class NintendoPage {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: IonSlides;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


  private tabs = ["selectTab(0)", "selectTab(1)"];
  private category: any = "0";
  private ntabs = 2;
  private SwipedTabsIndicator: any = null;

  Titulo: string = "";
  TituloJuegos: string = "";
  listadoNintendoNoticias = [];
  listadoPanelNintendoNoticias = [];
  listadoNintendoJuegos = [];
  listadoPanelNintendoJuegos = [];
  listadoPanelNoticias = [];
  listadoPanelJuegos = [];

  constructor(
    private router: Router,
    private Nintendo: NintendoService,
    private loadingController: LoadingController,
    private keyboard: Keyboard,
    private modalContoller: ModalController) {
    this.initializeItems();
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
   * Se ejecuta cuando la página está a punto de entrar y convertirse en la página activa.
   */
  ionViewWillEnter() {
    this.category = "0";
    this.SwipedTabsSlider.length().then(l => {
      this.ntabs = l;
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
  initializeItems() {
    this.listadoPanelNintendoNoticias = this.listadoNintendoNoticias;
    this.listadoPanelNintendoJuegos = this.listadoNintendoJuegos;
  }
  /**
     * Se ejecuta cuando la página ha entrado completamente y ahora es la página activa.
     * Carga los datos de todas las paginas y ademas de la rayita y de un loading hasta que cargue los datos
     */
  ionViewDidEnter() {

    this.SwipedTabsIndicator = document.getElementById("indicator");
    this.presentLoading("Cargando");


    this.Nintendo.leeNintendoNoticias(this.Titulo).then((querySnapshot) => {
      this.listadoNintendoNoticias = [];
      querySnapshot.forEach((doc) => {
        this.listadoNintendoNoticias.push({ id: doc.id, ...doc.data() });
      });
      this.listadoPanelNintendoNoticias = this.listadoNintendoNoticias;
      this.loadingController.dismiss();
    });

    this.Nintendo.leeNintendoJuegos(this.TituloJuegos).then((querySnapshot) => {
      this.listadoNintendoJuegos = [];
      querySnapshot.forEach((doc) => {
        this.listadoNintendoJuegos.push({ id: doc.id, ...doc.data() });
      });
      this.listadoPanelNintendoJuegos = this.listadoNintendoJuegos;
      this.loadingController.dismiss();
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

    this.Nintendo.leeNintendoNoticias(Titulo).then((querySnapshot) => {
      this.listadoNintendoNoticias = [];
      querySnapshot.forEach((doc) => {
        this.listadoNintendoNoticias.push({ id: doc.id, ...doc.data() });
      });
      this.listadoPanelNintendoNoticias = this.listadoNintendoNoticias;
      /* this.loadingController.dismiss();*/
    });

    this.Nintendo.leeNintendoJuegos(TituloJuegos).then((querySnapshot) => {
      this.listadoNintendoJuegos = [];
      querySnapshot.forEach((doc) => {
        this.listadoNintendoJuegos.push({ id: doc.id, ...doc.data() });
      });
      this.listadoPanelNintendoJuegos = this.listadoNintendoJuegos;
      /* this.loadingController.dismiss();*/
    });
  }

  /**
     * funcion para refrescar la ventana cunado hagamos la funcion
     * @param refresher 
     */

  doRefresh(refresher) {
    this.Nintendo.leeNintendoNoticias(this.Titulo)
      .then(querySnapshot => {
        this.listadoNintendoNoticias = [];
        querySnapshot.forEach((doc) => {
          this.listadoNintendoNoticias.push({ id: doc.id, ...doc.data() });
        });
        this.listadoPanelNintendoNoticias = this.listadoNintendoNoticias;
        //llamamos al metodo initializeItem para que recargue 
        //el arraylist con los elementos a buscar
        this.initializeItems();
        refresher.target.complete();
      });

    this.Nintendo.leeNintendoJuegos(this.TituloJuegos)
      .then(querySnapshot => {
        this.listadoNintendoJuegos = [];
        querySnapshot.forEach((doc) => {
          this.listadoNintendoJuegos.push({ id: doc.id, ...doc.data() });
        });
        this.listadoPanelNintendoJuegos = this.listadoNintendoJuegos;
        //llamamos al metodo initializeItem para que recargue 
        //el arraylist con los elementos a buscar
        this.initializeItems();
        refresher.target.complete();
      });
  }
  /**
     * volvemos a la ventana anterior
     */
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
      component: NintendoModalPage,

      componentProps: { id: id, titulo: titulo, foto: foto, video: video, descripcionC: descripcionC }
    });

    return await modal.present();
  }


}
