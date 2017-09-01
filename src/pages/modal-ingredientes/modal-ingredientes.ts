import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Ingrediente } from "../../models/ingrediente/ingrediente.interface";
//import { SelectIngrediente } from "../../models/ingrediente/selectIngrediente.interface";
import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { Subscription } from "rxjs/Subscription";
import { ToastController } from 'ionic-angular';
import { IngredienteService } from "../../providers/ingrediente/ingrediente.service";

class SelectIngrediente {
    public $key?: number;
    public nome: string;    
    public unidade: string;
} 

@Component({
    selector: 'page-modal-ingredientes',
    templateUrl: 'modal-ingredientes.html',
})

export class ModalIngredientesPage {

    public possuiParametro: boolean = false;
    public titulo: string;

    ingrediente = {} as Ingrediente;
    selectIngredientes: SelectIngrediente[];
    selectIngrediente = {} as SelectIngrediente;

    ingredienteSubscription: Subscription;
    ingredienteObjectRef$: FirebaseObjectObservable<Ingrediente>
    ingredientesListRef$: FirebaseListObservable<Ingrediente[]>;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams,                
                public viewCtrl: ViewController,
                private toastCtrl: ToastController,
                public ingredienteService: IngredienteService) {

        this.selectIngredientes = [
            { nome: 'Arroz', unidade: 'gramas' },
            { nome: 'Feijão', unidade: 'gramas' },
            { nome: 'Leite', unidade: 'litros' },
            { nome: 'Alface', unidade: 'gramas'}
        ];                    

        if (navParams.get('ingredienteId')) { //Editar ingrediente
            this.possuiParametro = true;
            this.titulo = 'Editar Ingrediente';          

            const ingredienteId = this.navParams.get('ingredienteId');
            this.ingredienteObjectRef$ = this.ingredienteService.selecionar(ingredienteId);
            this.ingredienteSubscription = this.ingredienteObjectRef$
                                               .subscribe(ingrediente => { this.ingrediente = ingrediente });

            this.selectIngrediente = this.selectIngredientes
                                         .find(ingrediente => ingrediente.nome === this.ingrediente.nome);
                                                                                            
        } else { //Incluir ingrediente
            this.possuiParametro = false;
            this.titulo = 'Novo Ingrediente';

            this.ingredientesListRef$ = this.ingredienteService.ingredientes;            
        }         
    }

    salvarIngrediente(ingrediente: Ingrediente, selectIngrediente: SelectIngrediente) {         
        ingrediente.nome = selectIngrediente.nome                
        if (!this.confereCampos(ingrediente)) {
            return;
        }

        /*
        Cria um objeto anônimo e converte quantidade para number.
        Dá um Push pro Firebase dentro da coleção 'ingrediente'
        */
        if (this.possuiParametro) {
            this.ingredienteObjectRef$.update(ingrediente);
        } else {
            this.ingredientesListRef$.push({
                nome: this.ingrediente.nome,
                quantidade: Number(this.ingrediente.quantidade)
            });
        }
        this.fecharModal();        
    }

    confereCampos(ingrediente: Ingrediente) {
        try {
            if (!this.ingrediente.nome || this.ingrediente.nome == "") throw "Informe o nome do ingrediente!";
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

    ionViewWillLeave() {
        if (this.possuiParametro) {
            this.ingredienteSubscription.unsubscribe();
        }        
    }    

}

