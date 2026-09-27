import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { produtos } from '../model/produtos';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-detalhe',
  styleUrl: './detalhe.css',
  templateUrl: './detalhe.html',
})
export class Detalhe implements OnInit {
  produto?: Produto;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.produto = this.lista.find((item) => item.id === id);
  }

  lista: Produto[] = produtos;
}
