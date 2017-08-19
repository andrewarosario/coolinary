import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Ingrediente } from "../../models/ingrediente/ingrediente.interface";
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { Subscription } from "rxjs/Subscription";
import { ToastController } from 'ionic-angular';

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
                public viewCtrl: ViewController,
                private toastCtrl: ToastController) {

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
            if (! this.ingrediente.nome) throw "Informe o nome do ingrediente!";
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

