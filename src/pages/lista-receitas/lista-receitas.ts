import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Receita } from "../../models/receita/receita.interface";

import { ReceitaPage } from '../../pages/receita/receita';

@Component({
    selector: 'page-lista-receitas',
    templateUrl: 'lista-receitas.html',
})

export class ListaReceitasPage {

    receitas: Receita[];
    
    constructor(public navCtrl: NavController) {
         this.receitas = [{titulo: 'Palha Italiana',
         tempoPreparo: '20min',
         porcoes: '30',
         ingredientes: ['2 latas de leite condensado',
                        '2 pacotes de bolacha maisena picados',
                        '2 colheres de margarina',
                        'Chocolate em pó ( umas 6 colheres de sopa )'],
         modoPreparo: ['Derrete a margarina na panela, mistura o leite condensado, o chocolate e mexe até o brigadeiro descolar do fundo da panela.',
                       'Desliga o fogo e mistura a bolacha picada grosseiramente.',
                       'Despeje numa assadeira retangular ( 35 x 25 cm ) untada com margarina e alise a massa.',
                       'Quando frio corte ( pode pôr para esfriar na geladeira por + ou - 1 h).',
                       'Se quiser, pode passar no açúcar de confeiteiro ou refinado mesmo.',
                       'Savor, buon appetito.'],
         tags: ['doces','italiana'],
         imagem: 'assets/img/palha_italiana.jpg'
     }];        
    }

    abrirReceita(receita: Receita) :void {
        this.navCtrl.push(ReceitaPage, {
            receita: receita
        });
    }

}
