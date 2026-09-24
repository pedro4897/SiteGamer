import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';

@Component({
  imports: [CommonModule],
  selector: 'app-cesta',
  styleUrl: './cesta.css',
  templateUrl: './cesta.html',
})
export class Cesta {
  produtos: Produto[] = [
    {
      id: 10,
      nome: 'Grand Theft Auto VI',
      descricao: 'Uma homenagem neon e tropical para o PS2.',
      preco: 129.90,
      precoPromocional: 99.90,
      imagem: 'img10.png'
    },
    {
      id: 3,
      nome: 'Dragon Ball Z: Budokai Tenkaichi 4',
      descricao: 'A atualização dos sonhos para o lendário BT3.',
      preco: 119.90,
      precoPromocional: 94.90,
      imagem: 'img3.webp'
    }
  ];

  get totalCompra(): number {
    return this.produtos.reduce((total, produto) => total + produto.precoPromocional, 0);
  }

  get totalEconomizado(): number {
    return this.produtos.reduce((total, produto) => total + (produto.preco - produto.precoPromocional), 0);
  }
}
