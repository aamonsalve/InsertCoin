import { Component,  ViewChild} from '@angular/core';
import { IonSlides, IonInfiniteScroll, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { XboxService } from 'src/app/servicios/Xbox.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { XboxModalPage } from 'src/app/modals/xbox-modal/xbox-modal.page';



@Component({
  selector: 'app-Xbox',
  templateUrl: './Xbox.page.html',
  styleUrls: ['./Xbox.page.scss'],
})
export class XboxPage {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: IonSlides;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  private tabs = ["selectTab(0)", "selectTab(1)"];
  private category: any = "0";
  private ntabs = 2;
  private SwipedTabsIndicator: any = null;
 
  Titulo: string ="";
  TituloJuegos :  string ="";
  listadoXboxNoticias=[];
  listadoPanelXboxNoticias=[];
  listadoXboxJuegos=[];
  listadoPanelXboxJuegos=[];
 
  constructor(
    private router: Router, 
    private modalContoller:ModalController,
    private Xbox:XboxService,
    private keyboard: Keyboard

  ) { 
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
 

  initializeItems(){
    this.listadoPanelXboxNoticias=this.listadoXboxNoticias;
    this.listadoPanelXboxJuegos=this.listadoPanelXboxJuegos;
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
    
    /*this.presentLoading("Cargando");*/
   
    this.SwipedTabsIndicator = document.getElementById("indicator");

    this.Xbox.leeXboxNoticias(this.Titulo).then((querySnapshot) => {
      this.listadoXboxNoticias = [];
      querySnapshot.forEach((doc) => {
        this.listadoXboxNoticias.push({ id: doc.id, ...doc.data() });
      });
      this.listadoPanelXboxNoticias = this.listadoXboxNoticias;
     /* this.loadingController.dismiss();*/
    });

    this.Xbox.leeXboxJuegos(this.TituloJuegos).then((querySnapshot) => {
      this.listadoXboxJuegos = [];
      querySnapshot.forEach((doc) => {
        this.listadoXboxJuegos.push({ id: doc.id, ...doc.data() });
      });
      this.listadoPanelXboxJuegos = this.listadoXboxJuegos;
     /* this.loadingController.dismiss();*/
    });
}
/**
   * Función para llamar a filtrar, igualamos el destino con lo que se ha escrito, y actualizamos la pagina con ese destino.
   * @param busqueda 
   */
  buscar(busqueda){
    this.Titulo = busqueda.srcElement.value;
    this.TituloJuegos = busqueda.srcElement.value;
    this.actualizarPage(this.Titulo, this.TituloJuegos);
  }



/**
   * Actualizamos la pagina de Xbox, stema y Xbox.
   * 
   */
  actualizarPage(Titulo: string, TituloJuegos: string) {

    this.Xbox.leeXboxNoticias(Titulo).then((querySnapshot) => {
      this.listadoXboxNoticias = [];
      querySnapshot.forEach((doc) => {
        this.listadoXboxNoticias.push({ id: doc.id, ...doc.data() });
      });
      this.listadoPanelXboxNoticias = this.listadoXboxNoticias;
    });
     /* this.loadingController.dismiss();*/
     this.Xbox.leeXboxJuegos(TituloJuegos).then((querySnapshot) => {
      this.listadoXboxJuegos = [];
      querySnapshot.forEach((doc) => {
        this.listadoXboxJuegos.push({ id: doc.id, ...doc.data() });
      });
      this.listadoPanelXboxJuegos = this.listadoXboxJuegos;
     /* this.loadingController.dismiss();*/
    });
  

   
  }


  doRefresh(refresher) {
      this.Xbox.leeXboxNoticias(this.Titulo)
      .then(querySnapshot => {
        this.listadoXboxNoticias = [];
        querySnapshot.forEach((doc) => {
          this.listadoXboxNoticias.push({ id: doc.id, ...doc.data() });
        });
        this.listadoPanelXboxNoticias = this.listadoXboxNoticias;
        //llamamos al metodo initializeItem para que recargue 
        //el arraylist con los elementos a buscar
        this.initializeItems();
        refresher.target.complete();
      });

      this.Xbox.leeXboxJuegos(this.TituloJuegos)
      .then(querySnapshot => {
        this.listadoXboxJuegos = [];
        querySnapshot.forEach((doc) => {
          this.listadoXboxJuegos.push({ id: doc.id, ...doc.data() });
        });
        this.listadoPanelXboxJuegos = this.listadoXboxJuegos;
        //llamamos al metodo initializeItem para que recargue 
        //el arraylist con los elementos a buscar
        this.initializeItems();
        refresher.target.complete();
      });
  }


  atras(){
    this.router.navigate(["/home"]);
    
  }
   /**
   * Oculta el teclado nativo al pulsar enter.
   */
  cerrar(){
    this.keyboard.hide();
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
      component: XboxModalPage ,
     
      componentProps: { id: id, titulo: titulo, foto: foto, video: video, descripcionC: descripcionC }
    });
    
    return await modal.present();
  }


}
