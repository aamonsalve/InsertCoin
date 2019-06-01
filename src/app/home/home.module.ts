import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'plataforma',
        loadChildren: '../home/home.module#HomePageModule'
      },
      {
        path: 'comunidad',
        loadChildren: '../home-comunidad/home-comunidad.module#HomeComunidadPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/plataforma',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
