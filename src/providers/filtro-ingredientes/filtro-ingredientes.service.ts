import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { Ingrediente, FiltroIngrediente } from "../../models/ingrediente/ingrediente.interface";
import { UsuarioService } from '../usuario/usuario.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class FiltroIngredientesService {

    ingredientes: FirebaseListObservable<FiltroIngrediente[]>;
    ingrediente: FirebaseObjectObservable<FiltroIngrediente>;
    idUsuario: any;

    constructor(public db: AngularFireDatabase,
                public afAuth: AngularFireAuth,
                public usuarioService: UsuarioService) {
        //this.ingredientes = this.db.list('ingrediente');
        this.listarIngredientes();
    }

    private listarIngredientes() {
        this.afAuth
        .authState
        .subscribe((authUsuario: firebase.User) => {
            if (authUsuario) {
                this.idUsuario = authUsuario.uid
                this.ingredientes = this.db.list(`filtroIngredientes/${this.idUsuario}`);
            }
        });
    }
    

    // selecionar(ingredienteId: any) {
    //     return this.db.object(`ingrediente/${this.idUsuario}/${ingredienteId}`);
    // }

    // atualiza(ingrediente: Ingrediente) {
    //     this.ingrediente = this.selecionar(ingrediente.$key);
    //     this.ingrediente.update(ingrediente);
    // }

    getIngrediente(selectIngredienteId: string): Observable<FiltroIngrediente> {
        return this.ingredientes.map((ingredientes: FiltroIngrediente[]) => {
                    return ingredientes.find((item: FiltroIngrediente) => item.keySelectIngrediente == selectIngredienteId);
                });   
    }

}
