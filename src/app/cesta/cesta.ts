import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../model/carrinho.service';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-cesta',
  styleUrl: './cesta.css',
  templateUrl: './cesta.html',
})
export class Cesta {
  readonly carrinho = inject(CarrinhoService);

  get produtos() {
    return this.carrinho.produtos();
  }

  get totalProdutos(): number {
    return this.produtos.reduce((total, produto) => total + produto.preco, 0);
  }

  get totalCompra(): number {
    return this.produtos.reduce((total, produto) => total + produto.precoPromocional, 0);
  }

  get totalEconomizado(): number {
    return this.produtos.reduce((total, produto) => total + (produto.preco - produto.precoPromocional), 0);
  }

  remover(id: number): void {
    this.carrinho.remover(id);
  }

  limpar(): void {
    this.carrinho.limpar();
  }
}
