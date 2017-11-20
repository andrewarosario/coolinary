import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-filtro-receitas',
    templateUrl: 'filtro-receitas.html',
})
export class FiltroReceitasPage {

    habilitaFiltro: boolean;

    tipo: any;
    regiao: any;
    dataComemorativa: any;
    tempoPreparo: any;
    rendimento: any;
    tipos = ['todos','salgados','doces','bebidas','massas','carnes'];
    regioes = ['todas','baiana','gaúcha','mexicana','italiana','japonesa'];
    datasComemorativas = ['todas','páscoa','aniversário','natal','ano novo','halloween'];
    temposPreparo = ['todos','até 5 minutos','até 10 minutos','até 20 minutos','até 30 minutos','mais de 30 minutos'];
    rendimentos = ['todos','1 pessoa', 'até 2 pessoas', 'até 5 pessoas', 'até 10 pessoas','mais de 10 pessoas'];

    constructor(public navCtrl: NavController, public navParams: NavParams) {

    }

}
