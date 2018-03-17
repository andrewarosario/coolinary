import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { FiltroReceitas } from '../../models/filtro-receitas/filtro-receitas.interface';
import { FiltroReceitasService } from '../../providers/filtro-receitas/filtro-receitas.service';
import { AtualizaReceitasService } from '../../providers/atualiza-receitas/atualiza-receitas';
import { FiltroIngredientesService } from '../../providers/filtro-ingredientes/filtro-ingredientes.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { FiltroIngrediente } from '../../models/ingrediente/ingrediente.interface';
import { InclusaoRapidaIngredientePage } from '../inclusao-rapida-ingrediente/inclusao-rapida-ingrediente';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Component({
    selector: 'page-filtro-receitas',
    templateUrl: 'filtro-receitas.html',
})
export class FiltroReceitasPage {

    podeSair: boolean = false;
    statusMensagem: boolean = false;
    filtroReceitas = {} as FiltroReceitas;
    filtroIngredientes: FiltroIngrediente[];
    listaIngredientes: FiltroIngrediente[];
    filtroIngredientesListRef$: FirebaseListObservable<FiltroIngrediente[]>;

    tipos = ['todos','salgados','doces','bebidas','massas','carnes'];
    regioes = ['todas','baiana','gaúcha','mexicana','italiana','japonesa'];
    datasComemorativas = ['todas','páscoa','aniversário','natal','ano novo','halloween'];
    temposPreparo = ['todos','até 5 minutos','até 10 minutos','até 20 minutos','até 30 minutos','mais de 30 minutos'];
    rendimentos = ['todos','1 pessoa', 'até 2 pessoas', 'até 5 pessoas', 'até 10 pessoas','mais de 10 pessoas'];

    constructor(public navCtrl: NavController, 
                public alertCtrl: AlertController,
                public navParams: NavParams,
                public viewCtrl: ViewController,
                public modalCtrl: ModalController,
                public filtroReceitasService: FiltroReceitasService,
                public filtroIngredientesService: FiltroIngredientesService,
                public atualizaReceitasService: AtualizaReceitasService,) {

        this.filtroReceitasService.filtroReceitas
            .first()
            .subscribe((filtroReceitas: FiltroReceitas) => {
                this.filtroReceitas = filtroReceitas;

                this.filtroReceitas.habilita = this.filtroReceitas.habilita || false;
                this.filtroReceitas.tipo = this.filtroReceitas.tipo || 'todos';
                this.filtroReceitas.regiao = this.filtroReceitas.regiao || 'todas';
                this.filtroReceitas.dataComemorativa = this.filtroReceitas.dataComemorativa || 'todas';
                this.filtroReceitas.tempoPreparo = this.filtroReceitas.tempoPreparo || 'todos';
                this.filtroReceitas.rendimento = this.filtroReceitas.rendimento || 'todos';

            });
            
    }

    ionViewDidLoad() {
        this.filtroIngredientesListRef$ = this.filtroIngredientesService.ingredientes;
        this.filtroIngredientesService.ingredientes
        .first()
        .subscribe((filtroIngredientes: FiltroIngrediente[]) => {
            this.filtroIngredientes = filtroIngredientes;
        });

    }

    ionViewCanLeave(): Promise<boolean> {
        return new Promise((resolve,reject) => {
            if (this.podeSair || !this.statusMensagem) {
                resolve();
                return;
            }
            let alertPopup = this.alertCtrl.create({
                message: 'Deseja aplicar os filtros?',
                buttons: [{
                        text: 'Sim',
                        handler: () => {     
                            this.filtroReceitas.habilita = true; 

                            this.salvarNovosIngredientes();
                            this.salvarFiltros();
                            resolve();         
                        }
                    },
                    {
                        text: 'Não',
                        handler: () => resolve()
                    },
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                        handler: () => reject()
                    }
                    ]
            });
            alertPopup.present();
        })
    }

    salvarFiltros() {
        this.podeSair = true;
        let salvaFiltro = {
                            habilita: this.filtroReceitas.habilita,
                            tipo: this.filtroReceitas.tipo,
                            regiao: this.filtroReceitas.regiao,
                            dataComemorativa: this.filtroReceitas.dataComemorativa,
                            tempoPreparo: this.filtroReceitas.tempoPreparo,
                            rendimento: this.filtroReceitas.rendimento
                          };

        this.filtroReceitasService.atualiza(salvaFiltro); 
        this.atualizaReceitasService.setAtualizar(true);
    }

    aplicarFiltros() {
        this.filtroReceitas.habilita = true;

        this.salvarNovosIngredientes();
        this.salvarFiltros();
        this.navCtrl.pop();
    }

    resetarFiltros(): void {
        this.filtroReceitas.habilita = false;
        this.filtroReceitas.tipo = 'todos';
        this.filtroReceitas.regiao = 'todas';
        this.filtroReceitas.dataComemorativa = 'todas';
        this.filtroReceitas.tempoPreparo = 'todos';
        this.filtroReceitas.rendimento = 'todos';

        this.deletarTodosIngredientes();

        this.salvarFiltros();
        this.navCtrl.pop();
    }

    addIngrediente() {
        this.podeSair = true;

        let modal = this.modalCtrl.create(InclusaoRapidaIngredientePage, {tipo: 'Filtro'});
        modal.onDidDismiss((ingrediente) => {
                if (ingrediente) {
                    this.alteraStatusMensagem()
                    this.filtroIngredientes.push(
                                     {
                                        nome: ingrediente.nome,
                                        keySelectIngrediente: ingrediente.$key
                                     }
                    );
                }
            ;
            this.podeSair = false;
        });
        modal.present();
    }

    deletarIngrediente(filtroIngredientes, index) {
        this.alteraStatusMensagem();
        filtroIngredientes.splice(index,1);
    }

    deletarTodosIngredientes() {
        this.filtroIngredientesListRef$.remove();
    }

    salvarNovosIngredientes() {
        this.deletarTodosIngredientes();
        if (this.filtroIngredientes.length > 0) {
            this.filtroIngredientes.forEach((ingrediente) => {
                this.filtroIngredientesListRef$.push(ingrediente);
            })
        }
    }

    alteraStatusMensagem() {
        this.statusMensagem = true;
    }

}
