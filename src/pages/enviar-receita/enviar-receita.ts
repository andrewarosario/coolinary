import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'page-enviar-receita',
    templateUrl: 'enviar-receita.html',
})

export class EnviarReceitaPage {

    envioForm: FormGroup;

    constructor(public navCtrl: NavController) {
    }

    ionViewDidLoad() {
      
    }

}
