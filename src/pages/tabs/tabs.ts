import { Component } from '@angular/core';
import { IngredientesPage } from "../ingredientes/ingredientes";
import { ListaReceitasPage } from "../lista-receitas/lista-receitas";
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {

    tab1Root: any = LoginPage;
    tab2Root: any = ListaReceitasPage;
    tab3Root: any = IngredientesPage;

    constructor(public navCtrl: NavController) {

    }

    

}
