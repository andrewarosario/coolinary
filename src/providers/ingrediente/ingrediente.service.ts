import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { Ingrediente } from "../../models/ingrediente/ingrediente.interface";

@Injectable()
export class IngredienteService {

    ingredientes: FirebaseListObservable<Ingrediente[]>;

    constructor(public db: AngularFireDatabase) {
        this.ingredientes = this.db.list('ingrediente');
    }

    selecionar(ingredienteId: any) {
        return this.db.object(`ingrediente/${ingredienteId}`);
    }

}
