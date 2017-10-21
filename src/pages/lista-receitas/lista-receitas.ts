import { Component, ViewChild } from '@angular/core';
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
    ingredientes: Ingrediente[];
    
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

    private mostrarLoading(): Loading {
        let loading: Loading = this.loadingCtrl.create({
            content: 'Carregando receitas...'
        });

        loading.present();
        return loading;
    }

    private atualizaPagina(refresher) {
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
                this.receitas = receitas;

                this.filtrarReceitas();
            })
    }

    filtrarReceitas() {
        this.receitas.forEach((receita: Receita,index) => {

            this.receitas[index].numeroIngredientesPossui = 0;

            receita.ingredienteKey.forEach((ingredienteReceita) => {

                this.ingredientes.forEach((ingrediente: Ingrediente) => {
                    if (ingrediente.nome == ingredienteReceita) {
                        this.receitas[index].numeroIngredientesPossui ++;
                    }
                })

            })

            let disponiveis = this.receitas[index].numeroIngredientesPossui;
            let total = this.receitas[index].ingredienteKey.length;

            this.receitas[index].textoIngredientesPossui = this.retornaTextoTotalDisponiveis(disponiveis,total);
            this.receitas[index].porcentagemIngredientes = this.calculaPorcentagem(disponiveis,total);
            
        });

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

}
