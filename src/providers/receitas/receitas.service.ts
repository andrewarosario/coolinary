import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Receita } from '../../models/receita/receita.interface';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';


@Injectable()
export class ReceitasService {

    receitas: FirebaseListObservable<Receita[]>;
    receita: FirebaseObjectObservable<Receita>;

    constructor(public db: AngularFireDatabase) {
        this.receitas = this.db.list('receitas');
    }

    selecionar(receitaId: any) {
        return this.db.object(`receitas/${receitaId}`);
    }

    atualizaTotalFavoritos(receitaId: any, operacaoSoma: boolean) {
        let totalFavoritas: number;
        this.receita = this.selecionar(receitaId);
        this.receita
            .first()
            .subscribe((receita: Receita) => {

                if (operacaoSoma) {
                    totalFavoritas = receita.favorita + 1;
                } else {
                    totalFavoritas = receita.favorita - 1;
                }
                
                this.receita.update({favorita: totalFavoritas});
            });

        
    }

}
