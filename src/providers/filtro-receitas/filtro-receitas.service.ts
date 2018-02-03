import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { FiltroReceitas } from '../../models/filtro-receitas/filtro-receitas.interface';
import { AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class FiltroReceitasService {

    filtroReceitas: FirebaseObjectObservable<FiltroReceitas>;
    idUsuario: any;
    
    constructor(public db: AngularFireDatabase,
                public afAuth: AngularFireAuth) {

        this.carregarFiltro();
        
    }

    carregarFiltro() {
        this.afAuth
        .authState
        .subscribe((authUsuario: firebase.User) => {
            if (authUsuario) {
                this.idUsuario = authUsuario.uid
                this.filtroReceitas = this.db.object(`filtroReceitas/${this.idUsuario}`);
            }
        });
    }

    atualiza(filtro) {
        this.filtroReceitas.set(filtro);
    }
}
