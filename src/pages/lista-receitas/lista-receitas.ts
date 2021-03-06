import { Component } from '@angular/core';
import { NavController, Loading, LoadingController, NavParams } from 'ionic-angular';
import { Receita } from "../../models/receita/receita.interface";
import { InfoIngrediente } from "../../models/receita/receita.interface";

import { ReceitaPage } from '../../pages/receita/receita';
import { ReceitasService } from '../../providers/receitas/receitas.service';
import { IngredienteService } from '../../providers/ingrediente/ingrediente.service';
import { Ingrediente } from '../../models/ingrediente/ingrediente.interface';
import { AtualizaReceitasService } from '../../providers/atualiza-receitas/atualiza-receitas';
import { ReceitasFavoritasService } from '../../providers/receitas-favoritas/receitas-favoritas.service';
import { ReceitasFavoritas } from '../../models/receitas-favoritas/receitas-favoritas.interface';
import { FiltroReceitasPage } from '../filtro-receitas/filtro-receitas';
import { FiltroReceitasService } from '../../providers/filtro-receitas/filtro-receitas.service';
import { FiltroReceitas } from '../../models/filtro-receitas/filtro-receitas.interface';
import { AuthService } from '../../providers/auth/auth.service';
import { FiltroIngredientesService } from '../../providers/filtro-ingredientes/filtro-ingredientes.service';

@Component({
    selector: 'page-lista-receitas',
    templateUrl: 'lista-receitas.html',
})

export class ListaReceitasPage {

    autenticado: boolean;
    receitas: Receita[];
    todasReceitas: Receita[];
    receitasFavoritas: ReceitasFavoritas[];
    filtroReceitas = {} as FiltroReceitas;
    ingredientes: Ingrediente[];
    filtroIngredientes: Ingrediente[];
    toggled: boolean = false;
    
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public loadingCtrl: LoadingController,
                public receitasService: ReceitasService,
                public ingredienteService: IngredienteService,
                public atualizaReceitasService: AtualizaReceitasService,
                public receitasFavoritasService: ReceitasFavoritasService,
                public filtroReceitasService: FiltroReceitasService,
                public filtroIngredientesService: FiltroIngredientesService,
                public authService: AuthService) {

        //this.carregarReceitas();
    }

    ionViewWillEnter() {
        this.authService.autenticado
                .then(() => {
                    if (this.atualizaReceitasService.podeAtualizar()) {
                        this.carregarReceitas();
                    }
                })
                .catch(() => {
                    if (this.atualizaReceitasService.podeAtualizar()) {
                        this.carregarReceitasSemUsuario();
                    }
                });
    }

    ionViewDidLoad() {
        this.authService.autenticado
                .then(() => this.carregarReceitas())
                .catch(() => this.carregarReceitasSemUsuario());
    }

    public get titulo(): string {
        return this.verificaPaginaFavoritas() ? 'Receitas Favoritas' : 'Receitas';
    }

    verificaPaginaFavoritas(): boolean {
        return (this.navParams.get('tipo')  == 'Favoritas') ? true : false;
    }

    private carregarReceitas() {
        let loading: Loading = this.mostrarLoading();
        
        this.getIngredientes();

        this.getReceitasFavoritas();

        this.getFiltroReceitas();

        //this.getReceitas();

        loading.dismiss(); 
    }

    private carregarReceitasSemUsuario() {
        let loading: Loading = this.mostrarLoading();

        this.receitasService.receitas
        .first()
        .subscribe((receitas: Receita[]) => {
            this.todasReceitas = receitas;

            this.filtrarReceitasSemUsuario();
        })
        
        loading.dismiss();
    }

    toggleSearch() {
        this.toggled = this.toggled ? false : true;
    }

    buscarReceitas( ev: any ) {
        let val = ev.target.value;
        
        if (val && val.trim() != '') {
            this.receitas = this.recebeTodasReceitasPorPorcentagem().filter((item) => {
                return (item.titulo.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        } else {
            this.receitas = this.recebeTodasReceitasPorPorcentagem();
        }
    }

    private mostrarLoading(): Loading {
        let loading: Loading = this.loadingCtrl.create({
            content: 'Carregando receitas...'
        });

        loading.present();
        return loading;
    }

    atualizaPagina(refresher) {
        this.carregarReceitas();

        refresher.complete();
    }

    private getIngredientes() {
        this.ingredienteService.ingredientes
        .first()
        .subscribe((ingredientes: Ingrediente[]) => this.ingredientes = ingredientes)
    }

    private getReceitas(): any {
        this.receitasService.receitas
            .first()
            .subscribe((receitas: Receita[]) => {
                this.todasReceitas = receitas;

                this.filtrarReceitas();
            })
    }

    private getReceitasFavoritas() {
        if (this.verificaPaginaFavoritas()) {

            this.receitasFavoritasService.receitasFavoritas
                .first()
                .subscribe((receitasFavoritas: ReceitasFavoritas[]) => {
                    this.receitasFavoritas = receitasFavoritas;
                });
        }
    }

    private getFiltroIngredientes() {
        //if (this.filtroReceitas.habilita) {
            
            this.filtroIngredientesService.ingredientes
                .first()
                .subscribe((filtroIngredientes: Ingrediente[]) => {
    
                    this.filtroIngredientes = filtroIngredientes

                    this.getReceitas();
                });
        //}
    }

    getFiltroReceitas() {
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

            this.getFiltroIngredientes();
        });
    }

    filtrarReceitas() {
        if (this.verificaPaginaFavoritas()) {
            this.filtraReceitasFavoritas();
        }

        if (this.filtroReceitas.habilita) {
            this.aplicaFiltros();
        }

        this.todasReceitas.forEach((receita: Receita,index) => {

            this.todasReceitas[index].numeroIngredientesPossui = 0;

            receita.infoIngredientes.forEach((infoIngrediente: InfoIngrediente) => {

                this.ingredientes.forEach((ingrediente: Ingrediente) => {
                    if (ingrediente.keySelectIngrediente == infoIngrediente.ingredienteKey) {
                        this.todasReceitas[index].numeroIngredientesPossui ++;
                        infoIngrediente.possui = true;
                    }
                });

            });

            //Lembrete: depois transformar em função
            receita.adicionais.forEach((infoIngrediente: InfoIngrediente) => {

                this.ingredientes.forEach((ingrediente: Ingrediente) => {
                    if (ingrediente.keySelectIngrediente == infoIngrediente.ingredienteKey) {
                        //this.todasReceitas[index].numeroIngredientesPossui ++;
                        infoIngrediente.possui = true;
                    }
                });

            });            

            let disponiveis = this.todasReceitas[index].numeroIngredientesPossui;
            let total = this.todasReceitas[index].infoIngredientes.length;

            this.todasReceitas[index].textoIngredientesPossui = this.retornaTextoTotalDisponiveis(disponiveis,total);
            this.todasReceitas[index].porcentagemIngredientes = this.calculaPorcentagem(disponiveis,total);
            
        });

        this.receitas = this.recebeTodasReceitasPorPorcentagem();

    }

    filtrarReceitasSemUsuario() {
        this.todasReceitas.forEach((receita: Receita,index) => {

            this.todasReceitas[index].numeroIngredientesPossui = 0;
            let total = this.todasReceitas[index].infoIngredientes.length;

            this.todasReceitas[index].textoIngredientesPossui = this.retornaTextoTotalDisponiveis(0,total);
            this.todasReceitas[index].porcentagemIngredientes = this.calculaPorcentagem(0,total);
        });

        this.receitas = this.recebeTodasReceitasPorPorcentagem();
    }

    calculaPorcentagem(disponiveis: number, total: number): number {
        return (disponiveis * 100) / total;
    }

    retornaTextoTotalDisponiveis(disponiveis: number, total: number): string {
        return `${disponiveis} / ${total}`;
    }

    abrirReceita(receita: Receita) :void {
        this.navCtrl.push(ReceitaPage, {
            receita: receita
        });
    }

    recebeTodasReceitasPorPorcentagem() {
        return this.todasReceitas.sort((a, b) => a.porcentagemIngredientes - b.porcentagemIngredientes)
                                 .reverse();
    }

    filtraReceitasFavoritas() {
        this.todasReceitas = this.todasReceitas.filter((receita: Receita) => {
            return this.receitasFavoritas.find((receitaFavorita) => receitaFavorita.keyReceita == receita.$key) != null            
        });
    }

    aplicaFiltros() {
        let tempoPreparo = 0;
        let rendimento = 0;

        if (this.filtroReceitas.tempoPreparo != 'todos') {
            tempoPreparo = parseInt(this.filtroReceitas.tempoPreparo.replace(/[^0-9]/g,''));
        }
        if (this.filtroReceitas.rendimento != 'todos') {
            rendimento = parseInt(this.filtroReceitas.rendimento.replace(/[^0-9]/g,''));
        }

        this.todasReceitas = this.todasReceitas.filter((receita: Receita) => {
            return this.confereTodosFiltros(receita,tempoPreparo,rendimento);
        });

    }

    confereTodosFiltros(receita: Receita, tempoPreparo, rendimento): boolean {
        if (!this.verificaFiltroIngredientes(receita)) {
            return false;
        }

        let filtro = {
                        tipo: false,
                        regiao: false,
                        dataComemorativa: false
                     }

        if (!this.verificaFiltroQuantidade(receita.tempoPreparo,tempoPreparo,this.filtroReceitas.tempoPreparo)) {
            return false
        }
        if (!this.verificaFiltroQuantidade(receita.porcoes,rendimento,this.filtroReceitas.rendimento)) {
            return false
        }

        receita.tags.forEach((tag) => {
            if (this.filtroReceitas.tipo == tag || this.filtroReceitas.tipo == 'todos') {
                filtro.tipo = true;
            }
            if (this.filtroReceitas.regiao == tag || this.filtroReceitas.regiao == 'todas') {
                filtro.regiao = true;
            }
            if (this.filtroReceitas.dataComemorativa == tag || this.filtroReceitas.dataComemorativa == 'todas') {
                filtro.dataComemorativa = true;
            }
        });

        if (!filtro.tipo) return false;
        if (!filtro.regiao) return false;
        if (!filtro.dataComemorativa) return false;
        return true;
    }

    verificaFiltroQuantidade(receitaQuantidade: number, quantidade: number, texto: string): boolean {
        if (quantidade != 0) {
            if (texto.substring(0,4) == 'mais') {
                if (receitaQuantidade <= quantidade) return false;
            } else {
                if (receitaQuantidade > quantidade) return false;
            }
        }
        return true;
    }

    verificaFiltroIngredientes(receita: Receita): boolean {
        let possuiIngrediente: boolean = true;

        if (this.filtroIngredientes.length == 0) {
            return true;
        } 
       
        this.filtroIngredientes.forEach((filtroIngrediente: Ingrediente) => {

            let achou = false;

            receita.infoIngredientes.forEach((ingrediente: InfoIngrediente) => {
                if (ingrediente.ingredienteKey == filtroIngrediente.keySelectIngrediente) {
                    achou = true;
                }
            });

            if (!achou) {
                possuiIngrediente = false;
                return;
            }
        });

        return possuiIngrediente;
        
    }

    abrirFiltro() {
         this.navCtrl.push(FiltroReceitasPage);
    }

}