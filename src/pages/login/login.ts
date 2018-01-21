import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RegistrarPage } from "../registrar/registrar";
import { AuthService } from "../../providers/auth/auth.service";
import { TabsPage } from "../tabs/tabs";

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
                console.log(error);
                loading.dismiss();
                this.mostrarAlert(error);
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


}