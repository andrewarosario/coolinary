export interface Ingrediente {
    $key?: string;
    keySelectIngrediente: string;
    nome: string;
    quantidade?: number;
    unidade: string;
    quantidadeConversao?: number;
    checado?: boolean;
}