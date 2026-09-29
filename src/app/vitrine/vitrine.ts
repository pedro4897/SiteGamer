import { Component, inject } from '@angular/core';
import { Produto } from '../model/produto';
import { produtos } from '../model/produtos';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../model/carrinho.service';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-vitrine',
  styleUrl: './vitrine.css',
  templateUrl: './vitrine.html',
})
export class Vitrine {
  lista: Produto[] = produtos;
  readonly carrinho = inject(CarrinhoService);

  alternarNoCarrinho(produto: Produto): void {
    this.carrinho.alternar(produto);
  }

  estaNoCarrinho(id: number): boolean {
    return this.carrinho.contem(id);
  }
}
