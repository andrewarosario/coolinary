import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { BaseService } from "../base/base.service";
import { Platform } from 'ionic-angular/platform/platform';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook'

@Injectable()
export class AuthService extends BaseService{

    constructor(public afAuth: AngularFireAuth,
                private platform: Platform,
                private fb: Facebook) {
        super();
    }

    criarAuthUsuario(usuario: {email: string, senha: string}): firebase.Promise<firebase.User> {
        return this.afAuth.auth.createUserWithEmailAndPassword(usuario.email,usuario.senha)
                    .catch(this.handlePromiseError);
    }

    logarComEmail(usuario: {email: string, senha: string}): firebase.Promise<boolean> {
        return this.afAuth.auth.signInWithEmailAndPassword(usuario.email,usuario.senha)
                    .then((authUsuario: firebase.User) => {
                        return authUsuario != null;
                    })
                    .catch(this.handlePromiseError);
    }

    // logarComFacebook(): firebase.Promise<any> {
    //     let provider = new firebase.auth.FacebookAuthProvider();

    //     return firebase.auth()
    //             .signInWithRedirect(provider)
    //             .then(() => {
    //                 firebase.auth()
    //                         .getRedirectResult()
    //                         .then((result) => {                                
    //                             return JSON.stringify(result);
    //                         })
    //                         .catch(this.handlePromiseError);
    //             })
    //             .catch(this.handlePromiseError);
    // }

    logarComFacebook(): firebase.Promise<any> {
        if (this.platform.is('cordova')) {
            return this.fb.login(['email', 'public_profile'])
                    .then(((res: FacebookLoginResponse) => {
                        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
                        return firebase.auth().signInWithCredential(facebookCredential);
                    }))
        } else {
            return this.afAuth.auth
            .signInWithPopup(new firebase.auth.FacebookAuthProvider())
            .then(res => {
                return res.user
            });
        }
    }

    logout(): firebase.Promise<any> {
        return this.afAuth.auth.signOut();
    }

    get autenticado(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.afAuth
                .authState
                .first()
                .subscribe((authUsuario: firebase.User) => {
                    console.log(authUsuario);
                    (authUsuario) ? resolve(true) : reject(false);
                });
        });
    }

    // logado() {
    //     return this.afAuth
    //                 .authState
    //                 .first()
    //                 .subscribe((authUsuario: firebase.User) => {
    //                     (authUsuario) ? true : false;
    //                 });
    // }
}