import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from "@angular/forms";

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule, FirestoreSettingsToken } from "@angular/fire/firestore";
import { environment } from '../environments/environment';

import { NetworkService } from './servicios/network.service';
import { Network } from '@ionic-native/network/ngx';
import { CustomToastModule } from './customModules/custom-toast/custom-toast.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Ps4ModalPage } from '../app/modals/ps4-modal/ps4-modal.page';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { ComunidadPage } from './modals/comunidad/comunidad.page';
import { XboxModalPage } from './modals/xbox-modal/xbox-modal.page';
import { NintendoModalPage } from './modals/nintendo-modal/nintendo-modal.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';





export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [AppComponent,Ps4ModalPage,XboxModalPage,ComunidadPage,NintendoModalPage],
  entryComponents: [AppComponent,Ps4ModalPage, ComunidadPage,XboxModalPage,NintendoModalPage],
  imports: [FormsModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule, AngularFirestoreModule, HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
 
  providers: [
    Network,  
    NetworkService,
    CustomToastModule,
    StatusBar,
    Keyboard,
    Camera,
    YoutubeVideoPlayer,
    EmailComposer,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: FirestoreSettingsToken, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
