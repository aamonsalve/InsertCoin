// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  currentLanguages: ['es', 'en'],
  defaultLanguage: "es",
  firebaseConfig: {
    apiKey: "AIzaSyCGS6PaWDSzESTYmCK_Pcuyr61zXoEQpY4",
    authDomain: "insert-coin-68f30.firebaseapp.com",
    databaseURL: "https://insert-coin-68f30.firebaseio.com",
    projectId: "insert-coin-68f30",
    storageBucket: "insert-coin-68f30.appspot.com",
    messagingSenderId: "531734210797",
    ps4NoticiasColection:"playNoticias",
    ps4JuegosColection:"playJuegos",
    xboxNoticiasColection:"xboxNoticias",
    xboxJuegosColection:"xboxJuegos",
    nintendoNoticiasColection:"nintendoNoticias",
    nintendoJuegosColection:"nintendoJuegos",
    usuariosColection:"usuarios",
    comunidadesColection:"comunidades",
    defaultImagen:"./assets/fotos/logo.png",  //imagen por defecto
    }
     
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
