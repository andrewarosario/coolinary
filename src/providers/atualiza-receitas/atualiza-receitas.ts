import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

let atualiza_key_name = "atualiza";

@Injectable()
export class AtualizaReceitasService {

    constructor() {
      
    }

    podeAtualizar(): boolean {
        if (localStorage.getItem(atualiza_key_name) == 'true') {
            this.setAtualizar(false);
            return true;
        }

        return false;
    }

    setAtualizar(condicao: boolean): void {
        let textoCondicao = (condicao ? 'true' : 'false');

        localStorage.setItem(atualiza_key_name,textoCondicao);
    }

}
