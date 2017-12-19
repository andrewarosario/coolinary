export interface Receita {
    $key?: any;
    titulo: string; 
    descricao?: string;
    tempoPreparo: number;   
    porcoes: number;
    ingredientes: string[];
    modoPreparo: string[];
    adicionais?: string[];
    tags?: string[];
    imagem: string;
    ingredienteKey: string[];
    favorita: number;
    numeroIngredientesPossui?: number;
    textoIngredientesPossui?: string;
    porcentagemIngredientes?: number;
}