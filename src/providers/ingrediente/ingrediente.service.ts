import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { Ingrediente } from "../../models/ingrediente/ingrediente.interface";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IngredienteService {

    ingredientes: FirebaseListObservable<Ingrediente[]>;
    ingrediente: FirebaseObjectObservable<Ingrediente>;

    constructor(public db: AngularFireDatabase) {
        this.ingredientes = this.db.list('ingrediente');
    }

    selecionar(ingredienteId: any) {
        return this.db.object(`ingrediente/${ingredienteId}`);
    }

    atualiza(ingrediente: Ingrediente) {
        this.ingrediente = this.selecionar(ingrediente.$key);
        this.ingrediente.update(ingrediente);
    }

    getIngrediente(selectIngredienteId: string): Observable<Ingrediente> {
        return this.ingredientes.map((ingredientes: Ingrediente[]) => {
                    return ingredientes.find((item: Ingrediente) => item.keySelectIngrediente == selectIngredienteId);
                });   
    }

}
