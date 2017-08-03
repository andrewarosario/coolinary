import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { FIREBASE_CREDENTIALS } from './firebase.credentials'
import { IngredientesPageModule } from '../pages/ingredientes/ingredientes.module';
import { ModalIngredientesPageModule } from "../pages/modal-ingredientes/modal-ingredientes.module";

@NgModule({
    declarations: [
        MyApp        
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),

        //Inicializando AngularFire com as credenciais
        AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
        AngularFireDatabaseModule,

        IngredientesPageModule,
        ModalIngredientesPageModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,        
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})

export class AppModule {}
