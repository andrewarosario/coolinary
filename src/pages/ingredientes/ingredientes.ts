import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, FabContainer } from 'ionic-angular';
import { FirebaseListObservable } from "angularfire2/database";
import { Ingrediente } from "../../models/ingrediente/ingrediente.interface";
import { ModalIngredientesPage } from "../modal-ingredientes/modal-ingredientes";
import { IngredienteService } from "../../providers/ingrediente/ingrediente.service";
import { InclusaoRapidaIngredientePage } from "../inclusao-rapida-ingrediente/inclusao-rapida-ingrediente";
import { ItemCompraService } from '../../providers/item-compra/item-compra.service';

@Component({
    selector: 'page-ingredientes',
    templateUrl: 'ingredientes.html',
})

export class IngredientesPage {

    view: string = 'Meus Ingredientes';

    ingredientesListRef$: FirebaseListObservable<Ingrediente[]>;
    itensCompraListRef$: FirebaseListObservable<Ingrediente[]>;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams,                
                public modalCtrl: ModalController,
                public ingredienteService: IngredienteService,
                public itemCompraService: ItemCompraService) {

        this.ingredientesListRef$ = this.ingredienteService.ingredientes;
        this.itensCompraListRef$ = this.itemCompraService.itensCompra;
    }

    inserirIngrediente(fab: FabContainer):void {
        fab.close();
        let modal = this.modalCtrl.create(ModalIngredientesPage);
        modal.present();
    }

    inserirMultiplosIngredientes(fab: FabContainer, tipo: string):void {
        fab.close();
        this.navCtrl.push(InclusaoRapidaIngredientePage, {
            tipo: tipo    
        });
    }

    editarIngrediente(ingrediente: Ingrediente):void {
        let modal = this.modalCtrl.create(ModalIngredientesPage, 
            { 
                ingredienteId: ingrediente.$key 
            });

        modal.present(); 
    }

    excluirIngrediente(item: Ingrediente):void {
        if (this.view == 'Meus Ingredientes') {
            this.ingredientesListRef$.remove(item.$key);
        } else {
            this.itensCompraListRef$.remove(item.$key);
        }
        
    }

}
