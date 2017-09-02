import { Component } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { Receita } from "../../models/receita/receita.interface";

@Component({
    selector: 'page-lista-receitas',
    templateUrl: 'lista-receitas.html',
})

export class ListaReceitasPage {

    receitasListRef$: FirebaseListObservable<Receita[]>;

    constructor(private database: AngularFireDatabase,) {

        this.receitasListRef$ = this.database.list('999');
        var teste = this.database.list('993');
        console.log(teste);
    }

    ionViewDidLoad() {
        console.log(this.receitasListRef$);
    }

}
