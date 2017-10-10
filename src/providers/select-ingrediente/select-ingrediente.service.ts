import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { SelectIngrediente } from "../../models/select-ingrediente/select-ingrediente.interface";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SelectIngredienteService {

    selectIngredientes: FirebaseListObservable<SelectIngrediente[]>;

    constructor(public db: AngularFireDatabase) {
        this.selectIngredientes = this.db.list('select-ingrediente');
    }

    getPorId(selectIngredienteId: any): Observable<SelectIngrediente> {
        return <FirebaseObjectObservable<SelectIngrediente>>this.selectIngredientes.map((selectIngredientes: SelectIngrediente[]) => {
                    return selectIngredientes.find((item: SelectIngrediente) => item.$key == selectIngredienteId);
                });   
    }    

}
