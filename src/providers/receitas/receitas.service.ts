import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Receita } from '../../models/receita/receita.interface';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class ReceitasService {

    receitas: FirebaseListObservable<Receita[]>;

    constructor(public db: AngularFireDatabase) {
        this.receitas = this.db.list('receitas');
    }

    selecionar(receitaId: any) {
        return this.db.object(`receitas/${receitaId}`);
    }

}
