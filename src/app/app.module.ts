import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { FIREBASE_CREDENTIALS } from './firebase.credentials'

import { TabsPageModule } from '../pages/tabs/tabs.module'
import { IngredientesPageModule } from '../pages/ingredientes/ingredientes.module';
import { ModalIngredientesPageModule } from "../pages/modal-ingredientes/modal-ingredientes.module";
import { ListaReceitasPageModule } from "../pages/lista-receitas/lista-receitas.module";
import { IngredienteService } from '../providers/ingrediente/ingrediente.service';
import { InclusaoRapidaIngredientePageModule } from "../pages/inclusao-rapida-ingrediente/inclusao-rapida-ingrediente.module";
import { ItemCompraService } from '../providers/item-compra/item-compra.service';
import { ReceitaPageModule } from '../pages/receita/receita.module';
import { SelectIngredienteService } from '../providers/select-ingrediente/select-ingrediente.service';
import { ReceitasService } from '../providers/receitas/receitas.service';
import { AtualizaReceitasService } from '../providers/atualiza-receitas/atualiza-receitas';
import { ReceitasFavoritasService } from '../providers/receitas-favoritas/receitas-favoritas.service';
import { MenuGeralComponent } from '../components/menu-geral/menu-geral';
import { FiltroReceitasPageModule } from '../pages/filtro-receitas/filtro-receitas.module';
import { FiltroReceitasService } from '../providers/filtro-receitas/filtro-receitas.service';
import { RegistrarPageModule } from '../pages/registrar/registrar.module';
import { AuthService } from '../providers/auth/auth.service';
import { UsuarioService } from '../providers/usuario/usuario.service';
import { LoginPageModule } from '../pages/login/login.module';
import { LoginInstagramPageModule } from '../pages/login-instagram/login-instagram.module';
import { InfoUsuarioComponent } from '../components/info-usuario/info-usuario';
import { PerfilUsuarioPage } from '../pages/perfil-usuario/perfil-usuario';
import { BarraProgressoComponent } from '../components/barra-progresso/barra-progresso';
import { Facebook } from '@ionic-native/facebook';
import { FiltroIngredientesService } from '../providers/filtro-ingredientes/filtro-ingredientes.service';
import { EnviarReceitaPageModule } from '../pages/enviar-receita/enviar-receita.module';

@NgModule({
    declarations: [
        MyApp,
        PerfilUsuarioPage,
        MenuGeralComponent,
        InfoUsuarioComponent,
        BarraProgressoComponent
    ],
    imports: [
        BrowserModule,
        
        IonicModule.forRoot(MyApp),
        //Inicializando AngularFire com as credenciais
        AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
        AngularFireDatabaseModule,
        AngularFireAuthModule,        
        TabsPageModule,
        IngredientesPageModule,      
        ListaReceitasPageModule,
        InclusaoRapidaIngredientePageModule,
        ReceitaPageModule,
        ModalIngredientesPageModule,
        FiltroReceitasPageModule,
        RegistrarPageModule,
        LoginPageModule,
        //PerfilUsuarioPageModule,
        LoginInstagramPageModule,
        EnviarReceitaPageModule
        
        
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        PerfilUsuarioPage     
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Facebook,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        IngredienteService,
        SelectIngredienteService,
        ItemCompraService,
        ReceitasService,
        AtualizaReceitasService,
        ReceitasFavoritasService,
        FiltroReceitasService,
        AuthService,
        UsuarioService,
        FiltroIngredientesService
    ]
})

export class AppModule {}
