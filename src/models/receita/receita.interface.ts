export class InfoIngrediente {
    quantidade: number;
    unidade: string;
    ingredienteKey: any;
    nome: string;
    obs: string;
    possui?: boolean;
}

export interface Receita {
    $key?: any;
    titulo: string; 
    descricao?: string;
    tempoPreparo: number;   
    porcoes: number;
    modoPreparo: string[];
    tags?: string[];
    imagem: string;
    video?: string;
    favorita: number;
    numeroIngredientesPossui?: number;
    textoIngredientesPossui?: string;
    porcentagemIngredientes?: number;

    infoIngredientes?: InfoIngrediente[];
    adicionais?: InfoIngrediente[];
}