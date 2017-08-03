import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { Ingrediente } from "../../models/ingrediente/ingrediente.interface";
import { ModalIngredientesPage } from "../modal-ingredientes/modal-ingredientes";

@Component({
    selector: 'page-ingredientes',
    templateUrl: 'ingredientes.html',
})

export class IngredientesPage {

    ingredientesListRef$: FirebaseListObservable<Ingrediente[]>;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                private database: AngularFireDatabase,
                public modalCtrl: ModalController,
                public actionSheetCtrl: ActionSheetController) {

        this.ingredientesListRef$ = this.database.list('ingrediente');
    }

    inserirIngrediente():void {
        let modal = this.modalCtrl.create(ModalIngredientesPage);
        modal.present();
    }

    selecionarIngrediente(ingrediente: Ingrediente):void {
        this.actionSheetCtrl.create({
            title: `${ingrediente.nome}`,
            buttons: [
                {
                    text: 'Editar',
                    handler: () => {
                        let modal = this.modalCtrl.create(ModalIngredientesPage, { ingredienteId: ingrediente.$key });
                        modal.present();                                              
                    }
                },
                {
                    text: 'Deletar',
                    role: 'destructive',
                    handler: () => {
                        this.ingredientesListRef$.remove(ingrediente.$key);
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {}
                }                  
            ]
        }).present();
    }

}
