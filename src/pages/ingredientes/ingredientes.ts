import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ModalController, FabContainer } from 'ionic-angular';
import { FirebaseListObservable } from "angularfire2/database";
import { Ingrediente } from "../../models/ingrediente/ingrediente.interface";
import { ModalIngredientesPage } from "../modal-ingredientes/modal-ingredientes";
import { IngredienteService } from "../../providers/ingrediente/ingrediente.service";
import { InclusaoRapidaIngredientePage } from "../inclusao-rapida-ingrediente/inclusao-rapida-ingrediente";

@Component({
    selector: 'page-ingredientes',
    templateUrl: 'ingredientes.html',
})

export class IngredientesPage {

    ingredientesListRef$: FirebaseListObservable<Ingrediente[]>;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams,                
                public modalCtrl: ModalController,
                public actionSheetCtrl: ActionSheetController,
                public ingredienteService: IngredienteService) {

        this.ingredientesListRef$ = this.ingredienteService.ingredientes;
    }

    inserirIngrediente(fab: FabContainer):void {
        fab.close();
        let modal = this.modalCtrl.create(ModalIngredientesPage);
        modal.present();
    }

    inserirMultiplosIngredientes(fab: FabContainer):void {
        fab.close();
        this.navCtrl.push(InclusaoRapidaIngredientePage);
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
