import { Component } from '@angular/core';
import { IngredientesPage } from "../ingredientes/ingredientes";
import { ListaReceitasPage } from "../lista-receitas/lista-receitas";
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {

    tab1Root: any = IngredientesPage;
    tab2Root: any = ListaReceitasPage;
    tab3Root: any = IngredientesPage;

    constructor(public navCtrl: NavController) {

    }

    

}
