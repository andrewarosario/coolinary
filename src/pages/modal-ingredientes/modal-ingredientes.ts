import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Ingrediente } from "../../models/ingrediente/ingrediente.interface";
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'page-modal-ingredientes',
    templateUrl: 'modal-ingredientes.html',
})

export class ModalIngredientesPage {

    public possuiParametro: boolean = false;
    public titulo: string;

    ingrediente = {} as Ingrediente;

    ingredienteSubscription: Subscription;

    ingredienteObjectRef$: FirebaseObjectObservable<Ingrediente>

    ingredientesListRef$: FirebaseListObservable<Ingrediente[]>;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                private database: AngularFireDatabase,
                public viewCtrl: ViewController) {

        if (navParams.get('ingredienteId')) {
            this.possuiParametro = true;
            this.titulo = 'Editar Ingrediente';          

            const ingredienteId = this.navParams.get('ingredienteId');
            this.ingredienteObjectRef$ = this.database.object(`ingrediente/${ingredienteId}`);
            this.ingredienteSubscription = this.ingredienteObjectRef$
                                               .subscribe(ingrediente => { this.ingrediente = ingrediente });
        } else {
            this.possuiParametro = false;
            this.titulo = 'Novo Ingrediente';

            this.ingredientesListRef$ = this.database.list('ingrediente');

        }         
        
    }

    salvarIngrediente(ingrediente: Ingrediente) {
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
