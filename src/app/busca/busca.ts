import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Produto } from '../model/produto';
import { produtos } from '../model/produtos';
import { CarrinhoService } from '../model/carrinho.service';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-busca',
  styleUrl: './busca.css',
  templateUrl: './busca.html',
})
export class Busca implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly carrinho = inject(CarrinhoService);
  readonly produtos: Produto[] = produtos;
  termo = '';

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.termo = params.get('q')?.trim() ?? '';
    });
  }

  get resultados(): Produto[] {
    const palavras = this.normalizar(this.termo).split(/\s+/).filter(Boolean);
    if (!palavras.length) return [];

    return this.produtos.filter((produto) => {
      const texto = this.normalizar([
        produto.nome,
        produto.titulo,
        produto.descricao,
        produto.genero,
        ...(produto.termosBusca ?? [])
      ].filter(Boolean).join(' '));
      const palavrasDoProduto = texto.split(/[^a-z0-9]+/).filter(Boolean);

      return palavras.every((palavra) => palavrasDoProduto.includes(palavra));
    });
  }

  alternarNoCarrinho(produto: Produto): void {
    this.carrinho.alternar(produto);
  }

  estaNoCarrinho(id: number): boolean {
    return this.carrinho.contem(id);
  }

  private normalizar(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
  }
}
