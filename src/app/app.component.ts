import { Component } from '@angular/core';
import { Platform, LoadingController, Loading } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from "../pages/tabs/tabs";
import { AuthService } from '../providers/auth/auth.service';
import { UsuarioService } from '../providers/usuario/usuario.service';

import * as firebase from 'firebase/app';
import { Usuario } from '../models/usuario/usuario.interface';
import { LoginPage } from '../pages/login/login';


@Component({
    templateUrl: 'app.html'
})

export class MyApp {
    rootPage:any = LoginPage;
    //usuarioAtual: Usuario;
    usuarioAtual = {} as Usuario;

    constructor(platform: Platform, 
        statusBar: StatusBar, 
        splashScreen: SplashScreen,
        authService: AuthService,
        loadingCtrl: LoadingController,
        usuarioService: UsuarioService) {

        let loading: Loading = loadingCtrl.create({
            content: 'Aguarde...'
        });
        loading.present();

        authService
            .afAuth
            .authState
            .subscribe((authUsuario: firebase.User) => {

                if (authUsuario) {
                    usuarioService.usuarioAtual
                    .subscribe((usuario: Usuario) => {                        
                        this.usuarioAtual = usuario;
                        this.rootPage = TabsPage;
                        loading.dismiss();
                    });
                } else {
                    this.usuarioAtual = undefined;
                    this.rootPage = LoginPage;
                    loading.dismiss();
                }
            });

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }

}

