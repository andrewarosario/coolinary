import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RegistrarPage } from "../registrar/registrar";
import { AuthService } from "../../providers/auth/auth.service";
import { TabsPage } from "../tabs/tabs";
import { UsuarioService } from '../../providers/usuario/usuario.service';
import { Usuario } from '../../models/usuario/usuario.interface';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

    loginForm: FormGroup;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                public formBuilder: FormBuilder,
                public authService: AuthService,
                public usuarioService: UsuarioService,
                public loadingCtrl: LoadingController,
                public alertCtrl: AlertController) {

        let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            senha: ['', [Validators.required, Validators.minLength(6)]],
        });                  
    }

    logar(): void {
        let loading: Loading = this.mostrarLoading();

        this.authService.logarComEmail(this.loginForm.value)
            .then((logou: boolean) => {
                if (logou) {
                    this.navCtrl.setRoot(TabsPage);
                    loading.dismiss();
                }
            })
            .catch((error: any) => {
                this.cancelaLogin(loading,error);
            });
    }

    registrar(): void {
        this.navCtrl.push(RegistrarPage);
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

    loginFacebook() {
        let loading: Loading = this.mostrarLoading();

        this.authService.logarComFacebook()
            .then((usuario) => {
                if (usuario) {
                    this.usuarioService.idUsuarioJaExiste(usuario.uid)
                        .first()
                        .subscribe((jaExiste: boolean) => {
                            if (!jaExiste) {
                                let dadosUsuario: Usuario = {
                                                                usuario: usuario.displayName, 
                                                                email: usuario.email,
                                                                foto: usuario.photoURL
                                                            }
                                this.usuarioService.criar(dadosUsuario,usuario.uid)
                                    .then(() => console.log('usuário cadastrado!'))
                                    .catch((error: any) => {
                                        this.cancelaLogin(loading,error);
                                    });
                            }
                            loading.dismiss();
                        });
                } else {
                    loading.dismiss();
                }
            }).catch((error: any) => {
                this.cancelaLogin(loading,error);
            });
    }

    naoLogar() {
        this.navCtrl.setRoot(TabsPage);
    }

    cancelaLogin(loading: Loading, error) {
        console.log(error);
        loading.dismiss();
        this.mostrarAlert(error);
    }

}