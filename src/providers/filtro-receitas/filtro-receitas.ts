import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { FiltroReceitas } from '../../models/filtro-receitas/filtro-receitas.interface';
import { AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';

@Injectable()
export class FiltroReceitasService {

    filtroReceitas: FirebaseObjectObservable<FiltroReceitas>;
    
    constructor(public db: AngularFireDatabase) {
        this.filtroReceitas = this.db.object('filtroReceitas');
        
    }

    atualiza(filtro) {
        this.filtroReceitas.set(filtro);
    }
}
