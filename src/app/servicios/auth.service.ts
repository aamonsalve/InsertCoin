import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
usuario:any;


  constructor(
    private AFauth: AngularFireAuth,
    private router: Router,
    private translate: TranslateService,
    private db: AngularFirestore) { 
    this.usuario = db.collection<any>(environment.firebaseConfig.usuariosColection)
    }

  login(email: string, password: string) {

    return new Promise((resolve, rejected) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
      }).catch(err => rejected(err));
    });


  }

  logout() {
 
    this.AFauth.auth.signOut().then(() => {
      this.router.navigate(['/desconectar']);
    })
  }

  email() {
    return this.AFauth.auth.currentUser;
   
  }
  user(){ 
     return  this.usuario.ref.where("uid" , "==" ,this.AFauth.auth.currentUser.uid).get();
  
}

/*name(nombre:string){
  
  return  this.usuario.ref.where("name" , "==" ,nombre).get();
  
 

}*/
 getName(id:string){

  return  this.usuario.ref.where("name" , "==" ,id).get();
}

  
  register(email: string, password: string, name: string) {

  
    return new Promise((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then(res => {
        // console.log(res.user.uid);
        const uid = res.user.uid;
        this.db.collection('usuarios').doc(uid).set({
          name: name,
          uid: uid
        })
        resolve(res)
      }).catch(err => alert(this.translate.instant("err")))
    })
    
  }


 
}
