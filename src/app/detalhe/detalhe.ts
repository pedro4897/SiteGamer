import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';

@Component({
  imports: [],
  selector: 'app-detalhe',
  styleUrl: './detalhe.css',
  templateUrl: './detalhe.html',
})
export class Detalhe {
  lista: Produto[] = [
    {"descricao": "Martelo com cabo de madeira e cabeça em aço forjado, ideal para trabalhos gerais.", "id": 1, "nome": "Martelo Unha 27mm", "preco": 49.90, "precoPromocional": 39.90},
    {"descricao": "Chave de fenda com haste em aço temperado e cabo ergonômico.", "id": 2, "nome": "Chave de Fenda 6mm", "preco": 18.90, "precoPromocional": 15.90},
    {"descricao": "Chave Phillips profissional para parafusos de diversos tamanhos.", "id": 3, "nome": "Chave Phillips PH2", "preco": 19.90, "precoPromocional": 16.90},
    {"descricao": "Alicate universal em aço carbono com cabo emborrachado antiderrapante.", "id": 4, "nome": "Alicate Universal 8 Polegadas", "preco": 39.90, "precoPromocional": 34.90},
    {"descricao": "Trena com fita metálica de 5 metros, trava de segurança e revestimento emborrachado.", "id": 5, "nome": "Trena 5 Metros", "preco": 29.90, "precoPromocional": 24.90},
    {"descricao": "Furadeira de impacto com potência de 650W, ideal para perfuração em madeira, metal e alvenaria.", "id": 6, "nome": "Furadeira de Impacto 650W", "preco": 199.90, "precoPromocional": 179.90}
      
  ];
}
