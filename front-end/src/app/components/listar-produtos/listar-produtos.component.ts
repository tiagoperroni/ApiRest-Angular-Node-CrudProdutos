import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements OnInit {
  listarProdutos: Produto [] = [];

  constructor(private produtoService: ProdutoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obterProdutos();
  }

  obterProdutos(){
    this.produtoService.getProdutos().subscribe(data => {
      console.log(data);
      this.listarProdutos = data;
    }, error => {
      console.log(error);
    })
  }

  deletarProduto(id: any): void{
    this.produtoService.deletarProduto(id).subscribe(data => {
      this.toastr.error('O produto foi deletado com sucesso!', 'Produto deletado');
      this.obterProdutos();
    }, error => {
      console.log(error);
    });
  }
}
