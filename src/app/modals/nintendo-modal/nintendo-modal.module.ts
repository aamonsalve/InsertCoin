import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NintendoModalPage } from './nintendo-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NintendoModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NintendoModalPage]
})
export class NintendoModalPageModule {}
