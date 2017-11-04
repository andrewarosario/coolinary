import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ReceitasFavoritas } from '../../models/receitas-favoritas/receitas-favoritas.interface';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReceitasFavoritasService {

    receitasFavoritas: FirebaseListObservable<ReceitasFavoritas[]>;

    constructor(public db: AngularFireDatabase) {
        this.receitasFavoritas = this.db.list('receitasFavoritas');
    }

    verificaFavorita(receitaKey: any): Observable<ReceitasFavoritas> {
        return this.receitasFavoritas.map((itens: ReceitasFavoritas[]) => {
                    return itens.find((item: ReceitasFavoritas) => item.keyReceita == receitaKey);
                });   
    }

}
