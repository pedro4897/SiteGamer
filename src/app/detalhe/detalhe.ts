import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { produtos } from '../model/produtos';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarrinhoService } from '../model/carrinho.service';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-detalhe',
  styleUrl: './detalhe.css',
  templateUrl: './detalhe.html',
})
export class Detalhe implements OnInit {
  readonly carrinho = inject(CarrinhoService);
  produto?: Produto;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.produto = this.lista.find((item) => item.id === id);
  }

  alternarNoCarrinho(): void {
    if (this.produto) this.carrinho.alternar(this.produto);
  }

  estaNoCarrinho(): boolean {
    return this.produto ? this.carrinho.contem(this.produto.id) : false;
  }

  lista: Produto[] = produtos;
}
