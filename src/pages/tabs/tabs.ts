import { Component } from '@angular/core';
import { IngredientesPage } from "../ingredientes/ingredientes";
import { ListaReceitasPage } from "../lista-receitas/lista-receitas";
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {

    tab1Root: any = ListaReceitasPage;
    tab2Root: any = IngredientesPage;

    constructor(public navCtrl: NavController,
                public menuCtrl: MenuController) {
        this.menuCtrl.enable(true, 'menu-geral');
    }

    

}
