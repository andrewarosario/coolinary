import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Ingrediente } from '../../models/ingrediente/ingrediente.interface';
import { ModalIngredientesPage } from '../modal-ingredientes/modal-ingredientes';

@Component({
    selector: 'page-enviar-receita',
    templateUrl: 'enviar-receita.html',
})

export class EnviarReceitaPage {

    envioForm: FormGroup;
    ingredientes = [] as Ingrediente[];

    constructor(public navCtrl: NavController,
                public modalCtrl: ModalController,
                public formBuilder: FormBuilder) {

        this.envioForm = this.formBuilder.group({
            titulo: ['',[Validators.required]],
            porcoes: ['',[Validators.required]],
            tempoPreparo: ['',[Validators.required]],
        })
    }

    enviar() {

    }

    addIngrediente() {
        let modal = this.modalCtrl.create(ModalIngredientesPage);
        modal.present();
    }

    deletarIngrediente(ingredientes, index) {
        ingredientes.splice(index,1);
    }

}
