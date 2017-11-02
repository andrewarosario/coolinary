import { Component } from '@angular/core';
import { NavController, Loading, LoadingController, ToastController } from 'ionic-angular';
import { Receita } from "../../models/receita/receita.interface";

import { ReceitaPage } from '../../pages/receita/receita';
import { ReceitasService } from '../../providers/receitas/receitas.service';
import { IngredienteService } from '../../providers/ingrediente/ingrediente.service';
import { Ingrediente } from '../../models/ingrediente/ingrediente.interface';
import { AtualizaReceitasService } from '../../providers/atualiza-receitas/atualiza-receitas';

@Component({
    selector: 'page-lista-receitas',
    templateUrl: 'lista-receitas.html',
})

export class ListaReceitasPage {

    receitas: Receita[];
    todasReceitas: Receita[];
    ingredientes: Ingrediente[];
    toggled: boolean = false;
    
    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController,
                public receitasService: ReceitasService,
                public ingredienteService: IngredienteService,
                public atualizaReceitasService: AtualizaReceitasService) {

        this.carregarReceitas();
    }

    ionViewWillEnter() {
        if (this.atualizaReceitasService.podeAtualizar()) {
            this.avisoToast('Foram encontradas alterações em seus ingredientes! Atualize para obter novas receitas');
        }
    }

    private carregarReceitas() {
        let loading: Loading = this.mostrarLoading();
        
        this.getIngredientes();

        this.getReceitas()

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
        .subscribe((ingredientes: Ingrediente[]) => {
            this.ingredientes = ingredientes;
        })
    }

    private getReceitas(): any {
        this.receitasService.receitas
            .first()
            .subscribe((receitas: Receita[]) => {
                this.todasReceitas = receitas;

                this.filtrarReceitas();
            })
    }

    filtrarReceitas() {
        this.todasReceitas.forEach((receita: Receita,index) => {

            this.todasReceitas[index].numeroIngredientesPossui = 0;

            receita.ingredienteKey.forEach((ingredienteReceita) => {

                this.ingredientes.forEach((ingrediente: Ingrediente) => {
                    if (ingrediente.nome == ingredienteReceita) {
                        this.todasReceitas[index].numeroIngredientesPossui ++;
                    }
                })

            })

            let disponiveis = this.todasReceitas[index].numeroIngredientesPossui;
            let total = this.todasReceitas[index].ingredienteKey.length;

            this.todasReceitas[index].textoIngredientesPossui = this.retornaTextoTotalDisponiveis(disponiveis,total);
            this.todasReceitas[index].porcentagemIngredientes = this.calculaPorcentagem(disponiveis,total);
            
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

    avisoToast(mensagem: string) {
        let toast = this.toastCtrl.create( {
            message: mensagem, 
            duration: 3000,            
            position: 'bottom',
            showCloseButton: false,            
        });
        toast.present();
    }

    recebeTodasReceitasPorPorcentagem() {
        return this.todasReceitas.sort((a, b) => a.porcentagemIngredientes - b.porcentagemIngredientes)
                                 .reverse();
    }

}
