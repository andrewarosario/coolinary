import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { Ingrediente } from "../../models/ingrediente/ingrediente.interface";
import { SelectIngrediente } from "../../models/select-ingrediente/select-ingrediente.interface";
import { IngredienteService } from "../../providers/ingrediente/ingrediente.service";
import { FirebaseListObservable } from "angularfire2/database";
import { ItemCompraService } from '../../providers/item-compra/item-compra.service';
import { SelectIngredienteService } from '../../providers/select-ingrediente/select-ingrediente.service';
import { ModalIngredientesPage } from '../modal-ingredientes/modal-ingredientes';
import 'rxjs/add/operator/first';
import { AtualizaReceitasService } from '../../providers/atualiza-receitas/atualiza-receitas';
import { FiltroIngredientesService } from '../../providers/filtro-ingredientes/filtro-ingredientes.service';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@Component({
    selector: 'page-inclusao-rapida-ingrediente',
    templateUrl: 'inclusao-rapida-ingrediente.html',
})

export class InclusaoRapidaIngredientePage {

    ingrediente = {} as Ingrediente;

    selectIngredientes: SelectIngrediente[];
    selectIngredientesListRef$: FirebaseListObservable<SelectIngrediente[]>;

    itemListRef$: FirebaseListObservable<Ingrediente[]>;
    modoItemCompra: boolean;
    modoFiltro: boolean;

    constructor(public navCtrl: NavController, 
                public viewCtrl: ViewController,
                public navParams: NavParams,
                public modalCtrl: ModalController,
                public selectIngredienteService: SelectIngredienteService,
                public ingredienteService: IngredienteService,
                public itemCompraService: ItemCompraService,
                public filtroIngredientesService: FiltroIngredientesService,
                public atualizaReceitasService: AtualizaReceitasService,
                private toastCtrl: ToastController) {

        switch(navParams.get('tipo')) {
            case 'Meus Ingredientes':
                this.itemListRef$ = this.ingredienteService.ingredientes;
                this.modoItemCompra = false;
                break;
            case 'Lista De Compras':
                this.itemListRef$ = this.itemCompraService.itensCompra;
                this.modoItemCompra = true;
                break;
            case 'Filtro':
                this.itemListRef$ = this.filtroIngredientesService.ingredientes
                this.modoFiltro = true;
        }

        // if (navParams.get('tipo')  == 'Meus Ingredientes') {        
        //     this.itemListRef$ = this.ingredienteService.ingredientes;
        //     this.modoItemCompra = false;
        // } else  {
        //     this.itemListRef$ = this.itemCompraService.itensCompra;
        //     this.modoItemCompra = true;
        // }

        this.carregarTodosIngredientes()
           
    }

    carregarTodosIngredientes() {
        this.selectIngredientesListRef$ = this.selectIngredienteService.selectIngredientes;
    }


    buscarIngredientes(event: any){
        this.carregarTodosIngredientes()

        let termoBusca: string = event.target.value;

        if (termoBusca && termoBusca.trim() != '') {
            this.selectIngredientesListRef$ = <FirebaseListObservable<SelectIngrediente[]>>this.selectIngredientesListRef$
            .map((selectIngredientes: SelectIngrediente[]) => {
                return selectIngredientes
                        .filter((selectIngrediente: SelectIngrediente) => {
                    return (selectIngrediente.nome
                                .toLowerCase().indexOf(termoBusca.toLowerCase()) > -1);    
                });
            });
        }
    }

    inclusaoRapida(selectIngrediente: SelectIngrediente): void {
        let qualProvider;
        if (this.modoFiltro) {
            qualProvider = this.filtroIngredientesService;
        } else if (this.modoItemCompra) {
            qualProvider = this.itemCompraService;
        } else {
            qualProvider = this.ingredienteService;
        }
        
        qualProvider.getIngrediente(selectIngrediente.$key)
            .first()
            .subscribe((ingrediente: Ingrediente) => {
                this.ingrediente = ingrediente; 
                if (this.modoFiltro) {
                    if (this.ingrediente == null) {
                        this.incluirFiltro(selectIngrediente);
                    } else {
                        this.avisoToast('Este ingrediente já consta na lista de filtros!')
                    }
                } else {
                    if (this.ingrediente == null) {
                        this.incluir(selectIngrediente); 
                    } else {
                        this.atualizar(ingrediente, qualProvider);
                    }
                } 
            });
    }

    incluir(selectIngrediente: SelectIngrediente) {
        if (this.navParams.get('tipo')  == 'Filtro') {

        }

        this.itemListRef$.push({
            nome: selectIngrediente.nome,
            quantidade: 1,
            keySelectIngrediente: selectIngrediente.$key
        }).then(() => {
            this.avisoToast(selectIngrediente.nome + ' adicionado(a)!')
            if (!this.modoItemCompra) {
                this.atualizaReceitasService.setAtualizar(true);
            }
        }).catch(() => this.avisoToast('Não foi possível adicionar :(')); 
    }

    atualizar(ingrediente: Ingrediente, qualProvider) {
        let quantidade = Number(ingrediente.quantidade);
        ingrediente.quantidade = quantidade + 1;

        qualProvider.atualiza(ingrediente);
        this.avisoToast(ingrediente.nome + ' adicionado(a)!')
        this.atualizaReceitasService.setAtualizar(true);
    }

    abrirModalIngrediente(selectIngrediente: SelectIngrediente): void {
        let modal = this.modalCtrl.create(ModalIngredientesPage, 
            { 
                selectIngredienteId: selectIngrediente.$key,
                tipo: this.navParams.get('tipo')
            });

        modal.present(); 
    }

    avisoToast(mensagem: string) {
        let toast = this.toastCtrl.create( {
            message: mensagem, 
            duration: 700,            
            position: 'bottom',
            showCloseButton: false,            
        });
        toast.present();
    }

    incluirFiltro(selectIngrediente: SelectIngrediente) {
        this.itemListRef$.push({
            nome: selectIngrediente.nome,
            keySelectIngrediente: selectIngrediente.$key
        })
        .then(() => this.viewCtrl.dismiss())
        .catch(() => this.viewCtrl.dismiss()); 
    }

}
