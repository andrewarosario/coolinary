import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ReceitasFavoritas } from '../../models/receitas-favoritas/receitas-favoritas.interface';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ReceitasFavoritasService {

    receitasFavoritas: FirebaseListObservable<ReceitasFavoritas[]>;

    constructor(public db: AngularFireDatabase) {
        
    }

    listar() {
        this.receitasFavoritas = this.db.list('receitasFavoritas');
    }

}
