export interface Ingrediente {
    $key?: string;
    nome: string;
    quantidade: number;
    unidade: string;
    checado?: boolean;
}