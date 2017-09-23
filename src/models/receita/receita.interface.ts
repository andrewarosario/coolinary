export interface Receita {
    $key?: number;
    titulo: string; 
    tempoPreparo: string;   
    porcoes: string;
    ingredientes: string[];
    modoPreparo: string[];
    adicionais?: string[];
    tags?: string[];
    imagem: string
}