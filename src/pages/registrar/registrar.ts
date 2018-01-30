import { Component } from '@angular/core';
import { NavController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import * as firebase from 'firebase/app';

import 'rxjs/add/operator/first';
import { AuthService } from '../../providers/auth/auth.service';
import { UsuarioService } from '../../providers/usuario/usuario.service';
import { TabsPage } from '../tabs/tabs';
import { AtualizaReceitasService } from '../../providers/atualiza-receitas/atualiza-receitas';
import { LoginInstagramPage } from '../login-instagram/login-instagram';

@Component({
    selector: 'page-registrar',
    templateUrl: 'registrar.html',
})

export class RegistrarPage {

    registrarForm: FormGroup;

    constructor(public navCtrl: NavController,
        public formBuilder: FormBuilder,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public authService: AuthService,
        public usuarioService: UsuarioService,
        public atualizaReceitasService: AtualizaReceitasService) {

        let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        this.registrarForm = this.formBuilder.group({
            usuario: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            senha: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    criarConta(): void {

        let loading: Loading = this.mostrarLoading();
        let formUsuario = this.registrarForm.value;
        let usuario: string = formUsuario.usuario;

         this.usuarioService.usuarioJaExiste(usuario)
            .first()
            .subscribe((usuarioJaExiste: boolean) => {
                if (!usuarioJaExiste) {

                    this.authService.criarAuthUsuario({
                        email: formUsuario.email,
                        senha: formUsuario.senha
                    }).then((authUsuario: firebase.User) => {
            
                        delete formUsuario.senha;
                        let uuid: string = authUsuario.uid;
            
                        this.usuarioService.criar(formUsuario, uuid)
                            .then(() => {
                                console.log('Usuário cadastrado!');
                                this.navCtrl.setRoot(TabsPage);
                                loading.dismiss();
                            }).catch((error: any) => {
                                console.log(error);
                                loading.dismiss();
                                this.mostrarAlert(error);
                            });
            
                    }).catch((error: any) => {
                        console.log(error);
                        loading.dismiss();
                        this.mostrarAlert(error);
                    });

                } else {
                    this.mostrarAlert(`O usuário ${usuario} já está sendo utilizado!`);
                    loading.dismiss();
                }
            });

    }

    private mostrarLoading(): Loading {
        let loading: Loading = this.loadingCtrl.create({
            content: 'Aguarde...'
        });

        loading.present();
        return loading;
    }

    private mostrarAlert(mensagem: string): void {
        this.alertCtrl.create({
            message: mensagem,
            buttons: ['Ok']
        }).present();
    }

    logout() {
        this.authService.logout()
            .then(() => {
                this.atualizaReceitasService.setAtualizar(true);
                this.navCtrl.setRoot(TabsPage);
            });
    }

    teste() {
        this.navCtrl.push(LoginInstagramPage)
    }

}