import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, FabContainer, ToastController } from 'ionic-angular';
import { FirebaseListObservable } from "angularfire2/database";
import { Ingrediente } from "../../models/ingrediente/ingrediente.interface";
import { ModalIngredientesPage } from "../modal-ingredientes/modal-ingredientes";
import { IngredienteService } from "../../providers/ingrediente/ingrediente.service";
import { InclusaoRapidaIngredientePage } from "../inclusao-rapida-ingrediente/inclusao-rapida-ingrediente";
import { ItemCompraService } from '../../providers/item-compra/item-compra.service';
import 'rxjs/add/operator/first';

@Component({
    selector: 'page-ingredientes',
    templateUrl: 'ingredientes.html',
})

export class IngredientesPage {

    view: string = 'Meus Ingredientes';
    existeItemChecado: boolean;

    ingredientesListRef$: FirebaseListObservable<Ingrediente[]>;
    itensCompraListRef$: FirebaseListObservable<Ingrediente[]>;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams,                
                public modalCtrl: ModalController,
                public ingredienteService: IngredienteService,
                public itemCompraService: ItemCompraService,
                private toastCtrl: ToastController) {

        this.ingredientesListRef$ = this.ingredienteService.ingredientes;
        this.itensCompraListRef$ = this.itemCompraService.itensCompra;

        this.verificaItemChecado();
      
    }

    private verificaItemChecado(): void {
        this.itemCompraService.verificaItemCompraChecado()
        .subscribe((existeChecado: boolean) => {
            this.existeItemChecado = existeChecado;
        });
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

    editarIngrediente(ingrediente: Ingrediente, tipo: string): void {
        let modal = this.modalCtrl.create(ModalIngredientesPage, 
            { 
                selectIngredienteId: ingrediente.keySelectIngrediente,
                tipo: tipo
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

    atualizaChecados(itemCompra: Ingrediente): void {
        this.itemCompraService.toggleChecado(itemCompra);
    }

    adicionarItensCompraAosIngredientes(): void {
        this.itemCompraService.retornaItensCompraChecados()
            .first()
            .subscribe((itens: Ingrediente[]) => {
                itens.forEach((itemCompra: Ingrediente) => {

                    this.ingredienteService.getIngrediente(itemCompra.keySelectIngrediente)
                    .first()
                    .subscribe((ingrediente: Ingrediente) => {
                        if (ingrediente == null) {
                            this.ingredientesListRef$.push({
                                nome: itemCompra.nome,
                                quantidade: Number(itemCompra.quantidade),
                                keySelectIngrediente: itemCompra.keySelectIngrediente
                            });

                        } else {
                            let quantidade = Number(ingrediente.quantidade);
                            ingrediente.quantidade = quantidade + itemCompra.quantidade;
                    
                            this.ingredienteService.atualiza(ingrediente);
                        }
                    });

                    this.itensCompraListRef$.remove(itemCompra.$key);
                });

                this.avisoToast('Os ingredientes foram adicionados!');
                
            })
    }

    avisoToast(mensagem: string) {
        let toast = this.toastCtrl.create( {
            message: mensagem, 
            duration: 850,            
            position: 'bottom',
            showCloseButton: false,            
        });
        toast.present();
    }
}
