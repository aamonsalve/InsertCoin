import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'principal', loadChildren: './transicion/principal/principal.module#PrincipalPageModule' },
  { path: 'ps4', loadChildren: './plataformas/ps4/ps4.module#Ps4PageModule' },
  { path: 'nintendo', loadChildren: './plataformas/nintendo/nintendo.module#NintendoPageModule' },
  { path: 'home-comunidad', loadChildren: './home-comunidad/home-comunidad.module#HomeComunidadPageModule' , canActivate : [AuthGuard]  },
  { path: 'inicio-sesion', loadChildren: './sesion/inicio-sesion/inicio-sesion.module#InicioSesionPageModule' },
  { path: 'registro', loadChildren: './sesion/registro/registro.module#RegistroPageModule' },
  { path: 'contacto', loadChildren: './menu/contacto/contacto.module#ContactoPageModule' , canActivate : [AuthGuard]  },
  { path: 'acerca-de', loadChildren: './menu/acerca-de/acerca-de.module#AcercaDePageModule' },
  { path: 'user', loadChildren: './sesion/user/user.module#UserPageModule' , canActivate : [AuthGuard]  },
  { path: 'desconectar', loadChildren: './transicion/desconectar/desconectar.module#DesconectarPageModule'  },
  { path: 'ps4-modal', loadChildren: './modals/ps4-modal/ps4-modal.module#Ps4ModalPageModule' },
  { path: 'comunidad', loadChildren: './modals/comunidad/comunidad.module#ComunidadPageModule' },
  { path: 'xbox-modal', loadChildren: './modals/xbox-modal/xbox-modal.module#XboxModalPageModule' },
  { path: 'nintendo-modal', loadChildren: './modals/nintendo-modal/nintendo-modal.module#NintendoModalPageModule' },
  { path: 'xbox', loadChildren: './plataformas/xbox/xbox.module#XboxPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
