import { Component } from '@angular/core';
import { Receita } from "../../models/receita/receita.interface";

@Component({
    selector: 'page-lista-receitas',
    templateUrl: 'lista-receitas.html',
})

export class ListaReceitasPage {

    receitas: Receita[];
    
    constructor() {
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
         tags: ['doces','italiana']
     }];        
    }

}
