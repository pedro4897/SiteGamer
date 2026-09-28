import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { produtos } from '../model/produtos';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-vitrine',
  styleUrl: './vitrine.css',
  templateUrl: './vitrine.html',
})
export class Vitrine {
  lista: Produto[] = produtos;
}
