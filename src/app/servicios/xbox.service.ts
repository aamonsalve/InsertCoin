import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class XboxService {


  mixboxNoticias: any;
  mixboxJuegos: any;

  constructor(private fireStore: AngularFirestore) {
    this.mixboxNoticias = fireStore.collection<any>(environment.firebaseConfig.xboxNoticiasColection),
    this.mixboxJuegos = fireStore.collection<any>(environment.firebaseConfig.xboxJuegosColection)
  }

 /**
     * Leemos los datos de la base de datos de la tabla Avion
     * @param Titulo
     */
    leeXboxNoticias(Titulo: String) {
      if (Titulo !== "") {
  
        //compara letra por letra con los datos Titulo de la base de datos y los que introducimos en el ion-search
        var strlength = Titulo.length;
        var strFrontCode = Titulo.slice(0, strlength - 1);
        var strEndCode = Titulo.slice(strlength - 1, Titulo.length);
        var startcode = Titulo;
        var endcode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
        return this.mixboxNoticias.ref.where('Titulo', '>=', startcode).where('Titulo', '<', endcode).get();
  
      }
      else {
        //si no hemos introducido ningun Titulo nos muestra todos los campos de nuestra base de datos
        return this.mixboxNoticias.ref.get();
      }
    } 
  
    /**
       * Leemos los datos de la base de datos de la tabla Avion
       * @param Titulo
       */
    leeXboxJuegos(TituloJuegos: String) {
      if (TituloJuegos !== "") {
  
        //compara letra por letra con los datos Titulo de la base de datos y los que introducimos en el ion-search
        var strlength = TituloJuegos.length;
        var strFrontCode = TituloJuegos.slice(0, strlength - 1);
        var strEndCode = TituloJuegos.slice(strlength - 1, TituloJuegos.length);
        var startcode = TituloJuegos;
        var endcode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
        return this.mixboxJuegos.ref.where('titulo', '>=', startcode).where('titulo', '<', endcode).get();
  
      }
      else {
        //si no hemos introducido ningun Titulo nos muestra todos los campos de nuestra base de datos
        return this.mixboxJuegos.ref.get();
      }
    }
  
}