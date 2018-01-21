import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { BaseService } from "../base/base.service";

@Injectable()
export class AuthService extends BaseService{

    constructor(public afAuth: AngularFireAuth) {
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

    logout(): firebase.Promise<any> {
        return this.afAuth.auth.signOut();
    }

    get autenticado(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.afAuth
                .authState
                .first()
                .subscribe((authUsuario: firebase.User) => {
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