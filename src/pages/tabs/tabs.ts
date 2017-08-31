import { Component } from '@angular/core';
import { IngredientesPage } from "../ingredientes/ingredientes";
import { ListaReceitasPage } from "../lista-receitas/lista-receitas";

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {

    tab1Root = IngredientesPage;
    tab2Root = ListaReceitasPage;
    tab3Root = IngredientesPage;

    constructor() {

    }

}
