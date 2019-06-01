import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomeComunidadPage } from './home-comunidad.page';

const routes: Routes = [
  {
    path: '',
    component: HomeComunidadPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeComunidadPage]
})
export class HomeComunidadPageModule {}
