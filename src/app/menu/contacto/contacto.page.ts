import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx'
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage {

  to = 'aamonsalve@iesfranciscodelosrios.es';
  body = '';
  subject = '';

  constructor(
    private emailComposer: EmailComposer,
    private navCtrl: NavController,

  ) {

  }

  //funcion con la que enviamos los datos a una app de correo 
  send() {
    let email = {
      to: this.to,
      cc: '',
      bcc: [''],
      attachments: [],
      subject: this.subject,
      body: this.body,
      isHtml: true
    }
    this.emailComposer.open(email);
  }

}
