import { Component } from '@angular/core';
import { NetworkService } from './servicios/network.service';
import { CustomToastModule } from './customModules/custom-toast/custom-toast.module';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  
  public appPages = [
    {
      title: 'Inicio - Plataformas',
      url: '/home',
      icon: 'logo-game-controller-b'
    },
    {
      title: 'Inicio - Comunidades',
      url: '/home-comunidad',
      icon: 'book'
    },
    {
      title: 'Contacto',
      url: '/contacto',
      icon: 'mail'
    },
    {
      title: 'Acerca De',
      url: '/acerca-de',
      icon: 'information-circle-outline'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private traducir :TranslateService,
    private network: NetworkService,
    private toast: CustomToastModule,
    private toastCtrl: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.traducir.setDefaultLang('es');
    });
  }
  cambiarIdioma($event) {
    //console.log(this.langModel);
   this.traducir.use($event.target.value);
   console.log($event.target.value);
   
  }  
}
