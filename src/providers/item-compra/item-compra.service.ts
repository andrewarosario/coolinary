import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { Ingrediente } from "../../models/ingrediente/ingrediente.interface";
import { Observable } from 'rxjs/Observable';
import { IngredienteService } from '../ingrediente/ingrediente.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class ItemCompraService {

    itensCompra: FirebaseListObservable<Ingrediente[]>;
    itemCompra: FirebaseObjectObservable<Ingrediente>;
    idUsuario: any;

    constructor(public db: AngularFireDatabase,
                public afAuth: AngularFireAuth,
                public ingredienteService: IngredienteService) {
        //this.itensCompra = this.db.list('itemCompra');
        this.listarItensCompra();
    }

    listarItensCompra() {
        this.afAuth
        .authState
        .subscribe((authUsuario: firebase.User) => {
            if (authUsuario) {
                this.idUsuario = authUsuario.uid
                this.itensCompra = this.db.list(`itemCompra/${this.idUsuario}`);
            }
        });
    }

    selecionar(itemCompraId: any) {
        return this.db.object(`itemCompra/${this.idUsuario}/${itemCompraId}`);
    }

    toggleChecado(itemCompra: Ingrediente) {
        this.itemCompra = this.selecionar(itemCompra.$key);
        this.itemCompra.update(itemCompra);
    }

    verificaItemCompraChecado(): Observable<boolean> {
        return this.itensCompra.map((itens: Ingrediente[]) => {
                    return itens.find((item: Ingrediente) => item.checado) != null;
                });   
    }

    retornaItensCompraChecados(): Observable<Ingrediente[]> {
        return this.itensCompra.map((itens: Ingrediente[]) => {
            return itens.filter((item: Ingrediente) => item.checado);
        });  
    }

    atualiza(item: Ingrediente) {
        this.itemCompra = this.selecionar(item.$key);
        this.itemCompra.update(item);
    }

    getIngrediente(selectIngredienteId: string): Observable<Ingrediente> {
        return this.itensCompra.map((ingredientes: Ingrediente[]) => {
                    return ingredientes.find((item: Ingrediente) => item.keySelectIngrediente == selectIngredienteId);
                });   
    }

}
