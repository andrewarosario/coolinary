import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Receita } from '../../models/receita/receita.interface';
import { ReceitasFavoritasService } from '../../providers/receitas-favoritas/receitas-favoritas.service';
import { ReceitasFavoritas } from '../../models/receitas-favoritas/receitas-favoritas.interface';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'page-receita',
    templateUrl: 'receita.html',
})
export class ReceitaPage {

    receita: Receita;
    receitaFavorita: ReceitasFavoritas;
    receitasFavoritasListRef$: FirebaseListObservable<ReceitasFavoritas[]>;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                public receitasFavoritasService: ReceitasFavoritasService,
                public toastCtrl: ToastController) {

        this.receita = navParams.get('receita');
        this.receitasFavoritasListRef$ = this.receitasFavoritasService.receitasFavoritas;

        this.verificaFavorita(this.receita.$key);

    }

    private verificaFavorita(receitaKey: any): void {
        this.receitasFavoritasService.verificaFavorita(receitaKey)
            .subscribe((receitaFavorita: ReceitasFavoritas) => {
                this.receitaFavorita = receitaFavorita;
                console.log(this.receitaFavorita)
            });
    }

    adicionarFavoritos(receita: Receita) {

        if (this.receitaFavorita == null) {
            this.receitasFavoritasListRef$.push({keyReceita: receita.$key});
            this.avisoToast(`${receita.titulo} foi adicionado(a) aos favoritos!`);
        } else {
            this.receitasFavoritasListRef$.remove(this.receitaFavorita.$key);
        }

    }

    public get iconeFavorito(): string {
        return this.receitaFavorita != null ? 'heart' : 'heart-outline';
    }

    public get corIconeFavorito(): string {
        return this.receitaFavorita != null ? 'like' : 'light-grey';
    }

    public get textoFavorito(): string {
        return this.receitaFavorita != null ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
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
