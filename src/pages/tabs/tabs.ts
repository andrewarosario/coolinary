import { Component } from '@angular/core';
import { IngredientesPage } from "../ingredientes/ingredientes";
import { ListaReceitasPage } from "../lista-receitas/lista-receitas";
import { NavController } from 'ionic-angular';
import { PerfilUsuarioPage } from '../perfil-usuario/perfil-usuario';

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {

    tab1Root: any = ListaReceitasPage;
    tab2Root: any = IngredientesPage;
    tab3Root: any = PerfilUsuarioPage;

    constructor(public navCtrl: NavController) {
        
    }

    

}
