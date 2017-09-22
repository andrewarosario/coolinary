import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { Ingrediente } from "../../models/ingrediente/ingrediente.interface";

@Injectable()
export class ItemCompraService {

    itensCompra: FirebaseListObservable<Ingrediente[]>;

    constructor(public db: AngularFireDatabase) {
        this.itensCompra = this.db.list('itemCompra');
    }

    selecionar(itemCompraId: any) {
        return this.db.object(`itemCompra/${itemCompraId}`);
    }

}
