import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Ingrediente } from "../../models/ingrediente/ingrediente.interface";
import { IngredienteService } from "../../providers/ingrediente/ingrediente.service";
import { FirebaseListObservable } from "angularfire2/database";

////ALTERAR//////
class SelectIngrediente {
  public $key?: number;
  public nome: string;    
  public unidade: string;
} 
////ALTERAR//////

@Component({
    selector: 'page-inclusao-rapida-ingrediente',
    templateUrl: 'inclusao-rapida-ingrediente.html',
})

export class InclusaoRapidaIngredientePage {

    buscaQuery: string = '';

    ingrediente = {} as Ingrediente;
    selectIngredientes: SelectIngrediente[];

    ingredientesListRef$: FirebaseListObservable<Ingrediente[]>;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                public ingredienteService: IngredienteService,
                private toastCtrl: ToastController) {

        this.ingredientesListRef$ = this.ingredienteService.ingredientes;

        this.init();
      
    }

    init() {
        ////ALTERAR//////
        this.selectIngredientes = [
            { nome: 'Arroz', unidade: 'gramas' },
            { nome: 'Feijão', unidade: 'gramas' },
            { nome: 'Leite', unidade: 'litros' },
            { nome: 'Alface', unidade: 'gramas'}
        ]; 
      ////ALTERAR//////                
    }

    buscarIngredientes(event: any) {
        this.init();

        let val = event.target.value;

        if (val && val.trim() != '') {
            this.selectIngredientes = this.selectIngredientes.filter((item) => {
                return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }        
    }

    incluirIngrediente(ingrediente: SelectIngrediente): void {
        this.ingredientesListRef$.push({
            nome: ingrediente.nome,
            quantidade: 1
        }).then(() => this.avisoToast(ingrediente.nome + ' adicionado(a)!','green'))
          .catch(() => this.avisoToast('Não foi possível adicionar :(','red'));        
    }

    avisoToast(mensagem: string, cor:string) {
        let toast = this.toastCtrl.create( {
            message: mensagem, 
            duration: 700,            
            position: 'bottom',
            showCloseButton: false,            
        });
        toast.present();
    }

}
