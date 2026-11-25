import { Component, inject } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../model/carrinho.service';
import { CatalogoService } from '../model/catalogo.service';
import { OnInit } from '@angular/core';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-vitrine',
  styleUrl: './vitrine.css',
  templateUrl: './vitrine.html',
})
export class Vitrine implements OnInit {
  private readonly catalogo = inject(CatalogoService);
  readonly carrinho = inject(CarrinhoService);

  get lista(): Produto[] {
    return this.catalogo.produtos();
  }

  ngOnInit(): void {
    this.catalogo.carregar();
  }

  get erroCatalogo(): string | null {
    return this.catalogo.erro();
  }

  alternarNoCarrinho(produto: Produto): void {
    this.carrinho.alternar(produto);
  }

  estaNoCarrinho(id: number): boolean {
    return this.carrinho.contem(id);
  }
}
