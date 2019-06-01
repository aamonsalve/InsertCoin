import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {environment} from '../../environments/environment';
import {mensajes} from 'src/app/servicios/mensaje.service';
import { firestore } from 'firebase';
import { parseIntAutoRadix } from '@angular/common/src/i18n/format_number';

@Injectable({
  providedIn: 'root'
})
export class ComunidadService {

  miComunidad: any;


  constructor(private fireStore: AngularFirestore) {
    this.miComunidad = fireStore.collection<any>(environment.firebaseConfig.comunidadesColection)

  }


  /** 
     * Leemos los datos de la base de datos de la tabla Avion
     * @param titulo
     */
    leerComunidades(titulo: String) {
      if (titulo !== "") {
  
        //compara letra por letra con los datos titulo de la base de datos y los que introducimos en el ion-search
        var strlength = titulo.length;
        var strFrontCode = titulo.slice(0, strlength - 1);
        var strEndCode = titulo.slice(strlength - 1, titulo.length);
        var startcode = titulo;
        console.log(startcode);
        var endcode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
        return this.miComunidad.ref.where('titulo', '>=', startcode).where('titulo', '<', endcode).get();
  
      }
      else {
        //si no hemos introducido ningun titulo nos muestra todos los campos de nuestra base de datos
        return this.miComunidad.ref.get();
      }
    }

    crearComunidad(Titulo: string, autor: string, Descripcion:string)
    {
      
      this.miComunidad.doc(Titulo).set({
        titulo: Titulo,
        descripcion: Descripcion,
        autor: autor,
        foto: "http://static.libsyn.com/p/assets/2/5/7/9/2579e4a10404f49f/Insert_Coin_History_-_Square_Logo_-_Rainbow_Asteroids_-_1600_x_1600_-_iTunes_-_v2_-_RGB.jpg"
      });

    }

    guardarMensaje(mensajes : mensajes, id: string){


      this.miComunidad.doc(id).update({
        mensajes : firestore.FieldValue.arrayUnion(mensajes),
      })
    }

    
  getMensajes(id : string){
    return this.fireStore.collection('comunidades').doc(id).valueChanges()
  }


  borrarComunidad(id : string){
    this.miComunidad.doc(id).delete();
    
  }

  borrarMensaje(id : string, mensaje: string, autor : string, foto : string){
    
    this.miComunidad.doc(id).update({
      "mensajes": firestore.FieldValue.arrayRemove({"autor": autor, "foto": foto ,"mensaje": mensaje})

    })

  }
  
}
