import { Component, Input } from '@angular/core';
import { ListaReceitasPage } from '../../pages/lista-receitas/lista-receitas';
import { MenuController, App } from 'ionic-angular';
import { BaseComponent } from '../base/base';
import { IngredientesPage } from '../../pages/ingredientes/ingredientes';
import { Usuario } from '../../models/usuario/usuario.interface';
import { AuthService } from '../../providers/auth/auth.service';
import { TabsPage } from '../../pages/tabs/tabs';
import { AtualizaReceitasService } from '../../providers/atualiza-receitas/atualiza-receitas';
import { PerfilUsuarioPage } from '../../pages/perfil-usuario/perfil-usuario';

@Component({
    selector: 'menu-geral',
    templateUrl: 'menu-geral.html'
})
export class MenuGeralComponent extends BaseComponent {    
    
    @Input() usuarioAtual: Usuario;
    paginas: Array<{ titulo: string, componente: any, icone: string }>;

    constructor(public app: App,
        public authService: AuthService,
        public menuCtrl: MenuController,
        public atualizaReceitasService: AtualizaReceitasService) {
        super(app,authService,menuCtrl)

        this.paginas = [
            {titulo: 'Meus Ingredientes', componente: IngredientesPage, icone: 'pizza'},
            {titulo: 'Buscar Receitas', componente: ListaReceitasPage, icone: 'restaurant'},
            {titulo: 'Receitas Favoritas', componente: ListaReceitasPage, icone: 'heart'},
            {titulo: 'Sair', componente: TabsPage, icone: 'exit'},
        ]
    }

    abrirPagina(pagina) {

        if (pagina.titulo == 'Receitas Favoritas') {
            this.navCtrl.push(ListaReceitasPage, {tipo: 'Favoritas'});
            return
        }

        if (pagina.titulo == 'Sair') {
            this.authService.logout()
            .then(() => {
                this.atualizaReceitasService.setAtualizar(true);
                this.navCtrl.setRoot(TabsPage);
                return;
            });
        }
        //this.navCtrl.push(ListaReceitasPage, {tipo: 'Favoritas'});
        //this.navCtrl.push(pagina.componente);
    }

    abrirPerfil() :void {
        this.navCtrl.setRoot(PerfilUsuarioPage);
    }

}
