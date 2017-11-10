import { Component } from '@angular/core';
import { ListaReceitasPage } from '../../pages/lista-receitas/lista-receitas';
import { MenuController, App } from 'ionic-angular';
import { BaseComponent } from '../base/base';
import { IngredientesPage } from '../../pages/ingredientes/ingredientes';

@Component({
    selector: 'menu-geral',
    templateUrl: 'menu-geral.html'
})
export class MenuGeralComponent extends BaseComponent {    
    
    paginas: Array<{ titulo: string, componente: any, icone: string }>;

    constructor(public app: App,
        public menuCtrl: MenuController) {
        super(app,menuCtrl)

        this.paginas = [
            {titulo: 'Meus Ingredientes', componente: IngredientesPage, icone: 'pizza'},
            {titulo: 'Buscar Receitas', componente: ListaReceitasPage, icone: 'restaurant'},
            {titulo: 'Receitas Favoritas', componente: ListaReceitasPage, icone: 'heart'},
        ]
    }

    abrirPagina(pagina) {

        if (pagina.titulo == 'Receitas Favoritas') {
            this.navCtrl.push(ListaReceitasPage, {tipo: 'Favoritas'});
            return
        }
        //this.navCtrl.push(ListaReceitasPage, {tipo: 'Favoritas'});
        this.navCtrl.push(pagina.componente);
    }

}
