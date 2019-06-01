import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Ps4ModalPage } from './ps4-modal.page';

const routes: Routes = [
  {
    path: '',
    component: Ps4ModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  
  declarations: [Ps4ModalPage]
 
})
export class Ps4ModalPageModule {}
