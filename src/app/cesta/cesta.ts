import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Produto } from '../model/produto';
import { produtos as catalogoProdutos } from '../model/produtos';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-cesta',
  styleUrl: './cesta.css',
  templateUrl: './cesta.html',
})
export class Cesta {
  produtos: Produto[] = catalogoProdutos.filter((produto) => [10, 3].includes(produto.id));

  get totalCompra(): number {
    return this.produtos.reduce((total, produto) => total + produto.precoPromocional, 0);
  }

  get totalEconomizado(): number {
    return this.produtos.reduce((total, produto) => total + (produto.preco - produto.precoPromocional), 0);
  }
}
