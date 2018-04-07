import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
import { Receita, InfoIngrediente } from '../../models/receita/receita.interface';
import { ReceitasFavoritasService } from '../../providers/receitas-favoritas/receitas-favoritas.service';
import { ReceitasFavoritas } from '../../models/receitas-favoritas/receitas-favoritas.interface';
import { FirebaseListObservable } from 'angularfire2/database';
import { ReceitasService } from '../../providers/receitas/receitas.service';
import { IngredienteService } from '../../providers/ingrediente/ingrediente.service';
import { ItemCompraService } from '../../providers/item-compra/item-compra.service';
import { Ingrediente } from '../../models/ingrediente/ingrediente.interface';
import { AtualizaReceitasService } from '../../providers/atualiza-receitas/atualiza-receitas';
import { AuthService } from '../../providers/auth/auth.service';


@Component({
    selector: 'page-receita',
    templateUrl: 'receita.html',
})
export class ReceitaPage {

    autenticado: boolean;
    receita: Receita;
    receitaFavorita: ReceitasFavoritas;
    receitasFavoritasListRef$: FirebaseListObservable<ReceitasFavoritas[]>;

    itemListRef$: FirebaseListObservable<Ingrediente[]>;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                public receitasService: ReceitasService,
                public receitasFavoritasService: ReceitasFavoritasService,
                public ingredienteService: IngredienteService,
                public itemCompraService: ItemCompraService,
                public toastCtrl: ToastController,
                public actionSheetCtrl: ActionSheetController,
                public atualizaReceitasService: AtualizaReceitasService,
                public authService: AuthService) {

        this.receita = navParams.get('receita');
        // this.receitasFavoritasListRef$ = this.receitasFavoritasService.receitasFavoritas;

        // this.verificaFavorita(this.receita.$key);

    }

    ionViewDidLoad() {
        this.authService.autenticado
            .then(() => {
                this.autenticado = true;
                this.receitasFavoritasListRef$ = this.receitasFavoritasService.receitasFavoritas;
                this.verificaFavorita(this.receita.$key);
            })
            .catch(() => {
                this.autenticado = false
            });
    }

    private verificaFavorita(receitaKey: any): void {
        this.receitasFavoritasService.verificaFavorita(receitaKey)
            .subscribe((receitaFavorita: ReceitasFavoritas) => {
                this.receitaFavorita = receitaFavorita;                
            });
    }

    adicionarFavoritos(receita: Receita) {

        if (!this.autenticado) {
            this.avisoToast(`Faça Login para adicionar a receita aos favoritos!`);
            return;
        }

        if (this.receitaFavorita == null) {
            this.receitasService.atualizaTotalFavoritos(receita.$key,true);

            this.receitasFavoritasListRef$.push({keyReceita: receita.$key});
            this.avisoToast(`${receita.titulo} foi adicionado(a) aos favoritos!`);

            
        } else {
            this.receitasService.atualizaTotalFavoritos(receita.$key,false);

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

    public corTextoIngrediente(possui): string {
        return possui ? 'green' : 'red';
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

    abrirOpcoesAdd(ingrediente: InfoIngrediente) {
        this.actionSheetCtrl.create({
            title: `Adicionar ${ingrediente.nome} em:`,
            buttons: [
                {
                    text: 'Meus Ingredientes',
                    handler: () => {
                        this.addIngrediente(1,ingrediente);
                    }
                },
                {
                    text: 'Minha Lista de Compras',
                    handler: () => {
                        this.addIngrediente(2,ingrediente);
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {}
                }                  
            ]
        }).present();
    }

    addIngrediente(tipo, ingrediente: InfoIngrediente) {
        let ingredienteSalvar = {
                                    nome: ingrediente.nome,
                                    quantidade: Number(ingrediente.quantidade),
                                    keySelectIngrediente: ingrediente.ingredienteKey,
                                    checado: false
                                }

        if (tipo == 1)  {
            this.ingredienteService.ingredientes.push(ingredienteSalvar)
                                                .then(() => ingrediente.possui = true);

            this.atualizaReceitasService.setAtualizar(true);
            this.avisoToast(`${ingrediente.nome} foi adicionado(a) aos seus ingredientes!`);
        } else {
            this.itemCompraService.itensCompra.push(ingredienteSalvar);
            this.avisoToast(`${ingrediente.nome} foi adicionado(a) em sua lista de compras!`);
        }
    }

}
