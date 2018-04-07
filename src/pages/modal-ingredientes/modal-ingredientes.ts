import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Ingrediente } from "../../models/ingrediente/ingrediente.interface";
import { SelectIngrediente, Unidade } from "../../models/select-ingrediente/select-ingrediente.interface";
import { FirebaseListObservable } from "angularfire2/database";
import { ToastController } from 'ionic-angular';
import { IngredienteService } from "../../providers/ingrediente/ingrediente.service";
import { SelectIngredienteService } from '../../providers/select-ingrediente/select-ingrediente.service';
import { ItemCompraService } from '../../providers/item-compra/item-compra.service';
import { AtualizaReceitasService } from '../../providers/atualiza-receitas/atualiza-receitas';

@Component({
    selector: 'page-modal-ingredientes',
    templateUrl: 'modal-ingredientes.html',
})

export class ModalIngredientesPage {

    selectIngredienteId: string;
    unidadeSelecionada = {} as Unidade;

    public modoEdicao: boolean = false;
    public modoItemCompra: boolean = false;
    public titulo: string;

    ingrediente = {} as Ingrediente;
    selectIngrediente = {} as SelectIngrediente;

    itemListRef$: FirebaseListObservable<Ingrediente[]>;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                public viewCtrl: ViewController,
                private toastCtrl: ToastController,
                public ingredienteService: IngredienteService,
                public selectIngredienteService: SelectIngredienteService,
                public itemCompraService: ItemCompraService,
                public atualizaReceitasService: AtualizaReceitasService) {   
                    
        if (navParams.get('tipo')  == 'Meus Ingredientes') {      
            this.itemListRef$ = this.ingredienteService.ingredientes;
            this.modoItemCompra = false;
        } else {
            this.itemListRef$ = this.itemCompraService.itensCompra;
            this.modoItemCompra = true;
        }
        
        this.selectIngredienteId = navParams.get('selectIngredienteId');         
        
        this.selectIngredienteService.getPorId(this.selectIngredienteId)
            .subscribe((selectIngrediente: SelectIngrediente) => {
                this.selectIngrediente = selectIngrediente;
                
                this.verificaExisteIngrediente(); 

            });
    }

    verificaExisteIngrediente(): void {

        let qualProvider;
        if (this.modoItemCompra) {
            qualProvider = this.itemCompraService;
        } else {
            qualProvider = this.ingredienteService;
        }        

        qualProvider.getIngrediente(this.selectIngredienteId)
            .subscribe((ingrediente: Ingrediente) => {
                this.ingrediente = ingrediente; 
                if (this.ingrediente == null) {
                    this.titulo = 'Novo Ingrediente';
                    this.ingrediente = {} as Ingrediente;
                    this.ingrediente.quantidade = 0;
                    this.modoEdicao = false;
                } else {
                    this.titulo = 'Editar Ingrediente';
                    this.modoEdicao = true

                    this.unidadeSelecionada = this.selectIngrediente.unidades.find((unidade: Unidade) => {
                        return this.ingrediente.unidade == unidade.nome
                    })
                    
                    //this.unidadeSelecionada.nome = ingrediente.unidade                                        
                    console.log(this.ingrediente)
                }         
            });
    }

    salvarIngrediente(ingrediente: Ingrediente) {       
        if (!this.confereCampos(ingrediente)) return;

        ingrediente.quantidadeConversao = this.calculaQuantidadeConversao(ingrediente.quantidade);
        ingrediente.unidade = this.unidadeSelecionada.nome
            
        if (this.modoEdicao) {
            if (this.navParams.get('tipo')  == 'Meus Ingredientes') {
                 
                this.ingredienteService.atualiza(ingrediente);
                this.atualizaReceitasService.setAtualizar(true);
            } else {
                this.itemCompraService.atualiza(ingrediente);
            }         
        } else {
            this.itemListRef$.push({
                nome: this.selectIngrediente.nome,
                quantidade: Number(this.ingrediente.quantidade),
                unidade: this.ingrediente.unidade,
                quantidadeConversao: this.ingrediente.quantidadeConversao,
                keySelectIngrediente: this.selectIngrediente.$key,
                checado: false
            });

            if (this.navParams.get('tipo')  == 'Meus Ingredientes') {
                this.atualizaReceitasService.setAtualizar(true);
            }
        }
        this.fecharModal();        
    }

    calculaQuantidadeConversao(quantidadeInformada) {
        return this.unidadeSelecionada.quantidade * quantidadeInformada;
    }

    confereCampos(ingrediente: Ingrediente) {
        try {
            if (!this.selectIngrediente.nome || this.selectIngrediente.nome == "") throw "Ingrediente não encontrado!";
            if (!this.ingrediente.quantidade || this.ingrediente.quantidade <= 0) throw "Informe uma quantidade!";
            if (!this.unidadeSelecionada) throw "Informe uma unidade!";

            return true;
        }
        catch(err) {
            let toast = this.toastCtrl.create( {
                message: err, 
                duration: 3000,
                position: 'bottom',
                showCloseButton: true,
                closeButtonText: 'X'                
            });
            toast.present();

            return false;          
        }
    }

    fecharModal() {
        this.ingrediente = {} as Ingrediente;
        this.viewCtrl.dismiss();  
    }  

}

