import { Component, Input } from '@angular/core';

@Component({
    selector: 'barra-porcentagem-receita',
    templateUrl: 'barra-porcentagem-receita.html'
})

export class BarraPorcentagemReceitaComponent {

    @Input() porcentagem: number;
    @Input() texto: string;

    constructor() {

    }

}
