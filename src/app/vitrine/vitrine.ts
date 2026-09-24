import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-vitrine',
  styleUrl: './vitrine.css',
  templateUrl: './vitrine.html',
})
export class Vitrine {
  lista: Produto[] = [
    { id: 1, nome: 'GTA Sonic', descricao: 'Velocidade absurda pelas ruas de San Andreas.', preco: 98.90, precoPromocional: 76.90, imagem: 'Img1.png' },
    { id: 2, nome: 'GTA Dragon Ball', descricao: 'Guerreiros Saiyajins em um mundo aberto.', preco: 109.90, precoPromocional: 87.90, imagem: 'img2.png' },
    { id: 3, nome: 'Dragon Ball Z: Budokai Tenkaichi 4', descricao: 'A atualização dos sonhos para o lendário BT3.', preco: 119.90, precoPromocional: 94.90, imagem: 'img3.webp' },
    { id: 4, nome: 'Super Bomba Patch 2026', descricao: 'A temporada mundial mais atualizada do futebol.', preco: 89.90, precoPromocional: 69.90, imagem: 'img4.png' },
    { id: 5, nome: 'GTA São Paulo', descricao: 'A selva de pedra com a cara do Brasil.', preco: 98.90, precoPromocional: 76.90, imagem: 'img5.png' },
    { id: 6, nome: 'GTA Rio de Janeiro', descricao: 'A Cidade Maravilhosa no motor de San Andreas.', preco: 98.90, precoPromocional: 76.90, imagem: 'img6.png' },
    { id: 7, nome: 'GTA Tropa de Elite', descricao: 'Operações táticas e ação nas áreas de risco.', preco: 109.90, precoPromocional: 84.90, imagem: 'img7.png' },
    { id: 8, nome: 'Super Mario Collection', descricao: 'Os maiores clássicos do encanador em um disco.', preco: 79.90, precoPromocional: 59.90, imagem: 'img8.png' },
    { id: 9, nome: 'GTA Spider City', descricao: 'Balance entre prédios e domine as ruas.', preco: 109.90, precoPromocional: 84.90, imagem: 'img9.png' },
    { id: 10, nome: 'Grand Theft Auto VI', descricao: 'Uma homenagem neon e tropical para o PS2.', preco: 129.90, precoPromocional: 99.90, imagem: 'img10.png' }
  ];

}
