import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-vitrine',
  styleUrl: './vitrine.css',
  templateUrl: './vitrine.html',
})
export class Vitrine {
  lista: Produto[] = [
    { id: 1, nome: 'Grand Theft Auto Sonic', descricao: 'Aventura clássica em alta velocidade.', preco: 89.90, precoPromocional: 69.90, imagem: '/Img1.png' },
    { id: 2, nome: 'Grand Theft Auto Dragon Ball', descricao: 'Uma mistura épica de ação e nostalgia.', preco: 99.90, precoPromocional: 79.90, imagem: '/img2.png' },
    { id: 3, nome: 'Lendas do Pixel', descricao: 'Uma nova jornada para os fãs dos clássicos.', preco: 79.90, precoPromocional: 59.90 },
    { id: 4, nome: 'Arena dos Campeoes', descricao: 'Entre na arena e prove seu valor.', preco: 119.90, precoPromocional: 89.90 },
    { id: 5, nome: 'Corrida Turbo', descricao: 'Velocidade, drift e muita adrenalina.', preco: 69.90, precoPromocional: 49.90 },
    { id: 6, nome: 'Masmorras Sombrias', descricao: 'Explore perigos e encontre tesouros.', preco: 109.90, precoPromocional: 84.90 },
    { id: 7, nome: 'Mundo dos Heróis', descricao: 'Monte sua equipe e salve o mundo.', preco: 139.90, precoPromocional: 104.90 },
    { id: 8, nome: 'Batalha Galáctica', descricao: 'Dispute o controle das estrelas.', preco: 129.90, precoPromocional: 94.90 },
    { id: 9, nome: 'Ilha Perdida', descricao: 'Sobreviva, descubra e construa sua história.', preco: 89.90, precoPromocional: 64.90 },
    { id: 10, nome: 'Futebol de Rua', descricao: 'A partida começa onde a diversão está.', preco: 99.90, precoPromocional: 74.90 }
  ];

}
