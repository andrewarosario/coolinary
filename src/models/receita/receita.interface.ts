export class InfoIngrediente {
    quantidade: number;
    unidade: string;
    ingredienteKey: any;
    nome: string;
    obs: string;
}

export interface Receita {
    $key?: any;
    titulo: string; 
    descricao?: string;
    tempoPreparo: number;   
    porcoes: number;
    ingredientes: string[];
    modoPreparo: string[];
    tags?: string[];
    imagem: string;
    ingredienteKey: string[];
    favorita: number;
    numeroIngredientesPossui?: number;
    textoIngredientesPossui?: string;
    porcentagemIngredientes?: number;

    infoIngredientes?: InfoIngrediente[];
    adicionais?: InfoIngrediente[];
}