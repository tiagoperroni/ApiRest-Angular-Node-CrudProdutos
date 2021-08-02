import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  url = 'http://localhost:4000/api/produtos/'

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<any> {
    return this.http.get(this.url);
  }

  deletarProduto(id: any): Observable<void> {
    return this.http.delete<void>(this.url + id);
  }

  criarProduto(produto: Produto): Observable<any> {
    return this.http.post(this.url, produto);
  }

  obterProdutoPorId(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  atualizarProduto(id: string, produto: Produto): Observable<any> {
    return this.http.put(this.url + id, produto);
  }

}


