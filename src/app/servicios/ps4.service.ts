import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Ps4Service {

  mips4Noticias: any; 
  mips4Juegos: any;

  constructor(private fireStore: AngularFirestore) {
    this.mips4Noticias = fireStore.collection<any>(environment.firebaseConfig.ps4NoticiasColection),
      this.mips4Juegos = fireStore.collection<any>(environment.firebaseConfig.ps4JuegosColection)
  }
  /**
     * Leemos los datos de la base de datos de la tabla Avion
     * @param Titulo
     */
  leePs4Noticias(Titulo: String) {
    if (Titulo !== "") {

      //compara letra por letra con los datos Titulo de la base de datos y los que introducimos en el ion-search
      var strlength = Titulo.length;
      var strFrontCode = Titulo.slice(0, strlength - 1);
      var strEndCode = Titulo.slice(strlength - 1, Titulo.length);
      var startcode = Titulo;
      var endcode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
      return this.mips4Noticias.ref.where('titulo', '>=', startcode).where('titulo', '<', endcode).get();

    }
    else {
      //si no hemos introducido ningun Titulo nos muestra todos los campos de nuestra base de datos
      return this.mips4Noticias.ref.get();
    }
  }

  /**
     * Leemos los datos de la base de datos de la tabla Avion
     * @param Titulo
     */
  leePs4Juegos(TituloJuegos: String) {
    if (TituloJuegos !== "") {

      //compara letra por letra con los datos Titulo de la base de datos y los que introducimos en el ion-search
      var strlength = TituloJuegos.length;
      var strFrontCode = TituloJuegos.slice(0, strlength - 1);
      var strEndCode = TituloJuegos.slice(strlength - 1, TituloJuegos.length);
      var startcode = TituloJuegos;
      var endcode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
      return this.mips4Juegos.ref.where('Titulo', '>=', startcode).where('Titulo', '<', endcode).get();

    }
    else {
      //si no hemos introducido ningun Titulo nos muestra todos los campos de nuestra base de datos
      return this.mips4Juegos.ref.get();
    }
  }
}