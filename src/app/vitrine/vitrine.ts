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
    { id: 1, nome: 'Grand Theft Auto Sonic', descricao: 'Aventura clássica em alta velocidade.', preco: 98.90, precoPromocional: 76.90, imagem: 'Img1.png' },
    { id: 2, nome: 'Grand Theft Auto Dragon Ball', descricao: 'Uma mistura épica de ação e nostalgia.', preco: 109.90, precoPromocional: 87.90, imagem: 'img2.png' },
    { id: 3, nome: 'Lendas do Pixel', descricao: 'Uma nova jornada para os fãs dos clássicos.', preco: 87.90, precoPromocional: 65.90, imagem: 'img3.webp' },
    { id: 4, nome: 'Arena dos Campeoes', descricao: 'Entre na arena e prove seu valor.', preco: 130.90, precoPromocional: 98.90, imagem: 'img4.png' },
    { id: 5, nome: 'Corrida Turbo', descricao: 'Velocidade, drift e muita adrenalina.', preco: 76.90, precoPromocional: 54.90, imagem: 'img5.png' },
    { id: 6, nome: 'Masmorras Sombrias', descricao: 'Explore perigos e encontre tesouros.', preco: 120.90, precoPromocional: 92.90, imagem: 'img6.png' },
    { id: 7, nome: 'Mundo dos Heróis', descricao: 'Monte sua equipe e salve o mundo.', preco: 153.90, precoPromocional: 114.90, imagem: 'img7.png' },
    { id: 8, nome: 'Batalha Galáctica', descricao: 'Dispute o controle das estrelas.', preco: 142.90, precoPromocional: 103.90, imagem: 'img8.png' },
    { id: 9, nome: 'Ilha Perdida', descricao: 'Sobreviva, descubra e construa sua história.', preco: 98.90, precoPromocional: 70.90, imagem: 'img9.png' },
    { id: 10, nome: 'Futebol de Rua', descricao: 'A partida começa onde a diversão está.', preco: 109.90, precoPromocional: 81.90, imagem: 'img10.png' }
  ];

}
