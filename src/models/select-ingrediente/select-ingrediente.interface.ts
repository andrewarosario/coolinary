export class Unidade {
    nome: string;
    quantidade: number;
}

export interface SelectIngrediente {
    $key?: any;
    nome: string;
    unidadePadrao: string;
    unidades?: Unidade[];
}