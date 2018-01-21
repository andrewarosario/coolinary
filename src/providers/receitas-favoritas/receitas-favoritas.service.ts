import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ReceitasFavoritas } from '../../models/receitas-favoritas/receitas-favoritas.interface';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class ReceitasFavoritasService {

    receitasFavoritas: FirebaseListObservable<ReceitasFavoritas[]>;
    idUsuario: any;

    constructor(public db: AngularFireDatabase,
                public afAuth: AngularFireAuth) {
        //this.receitasFavoritas = this.db.list('receitasFavoritas');

        this.listarReceitasFavoritas();
    }

    listarReceitasFavoritas() {
        this.afAuth
        .authState
        .subscribe((authUsuario: firebase.User) => {
            if (authUsuario) {
                this.idUsuario = authUsuario.uid
                this.receitasFavoritas = this.db.list(`receitasFavoritas/${this.idUsuario}`);
            }
        });
    }

    verificaFavorita(receitaKey: any): Observable<ReceitasFavoritas> {
        return this.receitasFavoritas.map((itens: ReceitasFavoritas[]) => {
                    return itens.find((item: ReceitasFavoritas) => item.keyReceita == receitaKey);
                });   
    }

}
