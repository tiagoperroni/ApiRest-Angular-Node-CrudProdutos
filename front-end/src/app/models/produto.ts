export class Produto {
  _id?: number;
  nome: string;
  categoria: string;
  local: string;
  preco: number;

  constructor(nome: string, categoria: string, local: string, preco: number) {
    this.nome = nome;
    this.categoria = categoria;
    this.local = local;
    this.preco = preco;
  }

}
