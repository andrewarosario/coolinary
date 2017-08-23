import { Component } from '@angular/core';
import { IngredientesPage } from "../ingredientes/ingredientes";

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {

    tab1Root = IngredientesPage;
    tab2Root = IngredientesPage;
    tab3Root = IngredientesPage;

    constructor() {

    }

}
