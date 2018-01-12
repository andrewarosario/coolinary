import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FiltroReceitas } from '../../models/filtro-receitas/filtro-receitas.interface';
import { FiltroReceitasService } from '../../providers/filtro-receitas/filtro-receitas';
import { AtualizaReceitasService } from '../../providers/atualiza-receitas/atualiza-receitas';

@Component({
    selector: 'page-filtro-receitas',
    templateUrl: 'filtro-receitas.html',
})
export class FiltroReceitasPage {

    filtroReceitas = {} as FiltroReceitas;

    tipos = ['todos','salgados','doces','bebidas','massas','carnes'];
    regioes = ['todas','baiana','gaúcha','mexicana','italiana','japonesa'];
    datasComemorativas = ['todas','páscoa','aniversário','natal','ano novo','halloween'];
    temposPreparo = ['todos','até 5 minutos','até 10 minutos','até 20 minutos','até 30 minutos','mais de 30 minutos'];
    rendimentos = ['todos','1 pessoa', 'até 2 pessoas', 'até 5 pessoas', 'até 10 pessoas','mais de 10 pessoas'];

    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                public viewCtrl: ViewController,
                public filtroReceitasService: FiltroReceitasService,
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

            this.atualizaReceitasService.setAtualizar(true);
    }

    ionViewWillLeave() {
        let salvaFiltro = {
                            habilita: this.filtroReceitas.habilita,
                            tipo: this.filtroReceitas.tipo,
                            regiao: this.filtroReceitas.regiao,
                            dataComemorativa: this.filtroReceitas.dataComemorativa,
                            tempoPreparo: this.filtroReceitas.tempoPreparo,
                            rendimento: this.filtroReceitas.rendimento
                          };

        this.filtroReceitasService.atualiza(salvaFiltro);  
    }

    resetarFiltros(): void {
        this.filtroReceitas.tipo = 'todos';
        this.filtroReceitas.regiao = 'todas';
        this.filtroReceitas.dataComemorativa = 'todas';
        this.filtroReceitas.tempoPreparo = 'todos';
        this.filtroReceitas.rendimento = 'todos';
    }

}
