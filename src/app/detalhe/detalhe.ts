import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarrinhoService } from '../model/carrinho.service';
import { SafePipe } from '../safe-pipe';
import { CatalogoService } from '../model/catalogo.service';

@Component({
  imports: [CommonModule, RouterLink, SafePipe],
  selector: 'app-detalhe',
  styleUrl: './detalhe.css',
  templateUrl: './detalhe.html',
})
export class Detalhe implements OnInit {
  readonly carrinho = inject(CarrinhoService);
  private readonly catalogo = inject(CatalogoService);

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.catalogo.carregar();
  }

  get produto(): Produto | undefined {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.catalogo.produtos().find((item) => item.id === id);
  }

  alternarNoCarrinho(): void {
    if (this.produto) this.carrinho.alternar(this.produto);
  }

  estaNoCarrinho(): boolean {
    return this.produto ? this.carrinho.contem(this.produto.id) : false;
  }

}
