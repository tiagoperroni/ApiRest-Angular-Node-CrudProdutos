import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.component.html',
  styleUrls: ['./criar-produto.component.css']
})
export class CriarProdutoComponent implements OnInit {
  produtoForm: FormGroup;
  titulo = 'Criar produto';
  id: string | null;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private produtoService: ProdutoService,
      private route: ActivatedRoute) {
    this.produtoForm = this.fb.group({
      produto: ['', Validators.required],
      categoria: ['', Validators.required],
      local: ['', Validators.required],
      preco: ['', Validators.required],
    })
    this.id = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.estaNoUpdate();
  }

  criarProduto() {
    console.log(this.produtoForm);
    console.log(this.produtoForm.get('produto')?.value);

    const PRODUTO: Produto = {
      nome: this.produtoForm.get('produto')?.value,
      categoria: this.produtoForm.get('categoria')?.value,
      local: this.produtoForm.get('local')?.value,
      preco: this.produtoForm.get('preco')?.value,
    }

    if(this.id !== null) {
      this.produtoService.atualizarProduto(this.id, PRODUTO).subscribe(data => {
      this.toastr.info('Produto atualizado com sucesso!', 'Produto atualizado');
      this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.produtoForm.reset();
      });

    }else {
      console.log(PRODUTO);
    this.produtoService.criarProduto(PRODUTO).subscribe(data => {
      this.toastr.success('Produto criado com sucesso!', 'Produto Criado!');
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.produtoForm.reset();
    });
    }


  }

  estaNoUpdate() {
    if(this.id !== null){
      this.titulo = "Editar produto";
      this.produtoService.obterProdutoPorId(this.id).subscribe(data => {
        this.produtoForm.setValue({
          produto: data.nome,
          categoria: data.categoria,
          local: data.local,
          preco: data.preco,
        });
      });
    }
  }
}
