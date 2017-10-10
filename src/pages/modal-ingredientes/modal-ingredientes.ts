import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Ingrediente } from "../../models/ingrediente/ingrediente.interface";
import { SelectIngrediente } from "../../models/select-ingrediente/select-ingrediente.interface";
import { FirebaseListObservable } from "angularfire2/database";
import { ToastController } from 'ionic-angular';
import { IngredienteService } from "../../providers/ingrediente/ingrediente.service";
import { SelectIngredienteService } from '../../providers/select-ingrediente/select-ingrediente.service';
import { ItemCompraService } from '../../providers/item-compra/item-compra.service';

@Component({
    selector: 'page-modal-ingredientes',
    templateUrl: 'modal-ingredientes.html',
})

export class ModalIngredientesPage {

    selectIngredienteId: string;

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
                public itemCompraService: ItemCompraService) {   
                    
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
                }         
            });
    }

    salvarIngrediente(ingrediente: Ingrediente) {         
        if (!this.confereCampos(ingrediente)) return;
        
        /*
        Cria um objeto anônimo e converte quantidade para number.
        Dá um Push pro Firebase dentro da coleção 'ingrediente'
        */
         
        if (this.modoEdicao) {
            if (this.navParams.get('tipo')  == 'Meus Ingredientes') {
                 
                this.ingredienteService.atualiza(ingrediente);
            } else {
                this.itemCompraService.atualiza(ingrediente);
            }         
        } else {
            this.itemListRef$.push({
                nome: this.selectIngrediente.nome,
                quantidade: Number(this.ingrediente.quantidade),
                keySelectIngrediente: this.selectIngrediente.$key,
                checado: false
            });
        }
        this.fecharModal();        
    }

    confereCampos(ingrediente: Ingrediente) {
        try {
            if (!this.selectIngrediente.nome || this.selectIngrediente.nome == "") throw "Ingrediente não encontrado!";
            if (!this.ingrediente.quantidade || this.ingrediente.quantidade <= 0) throw "Informe uma quantidade!";

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

