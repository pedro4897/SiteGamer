import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, Injectable, inject, signal } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { Produto } from './produto';
import { produtos as catalogo } from './produtos';

const STORAGE_KEY = 'sitegamer-carrinho';
const produtosPorId = new Map(catalogo.map((produto) => [produto.id, produto]));

function ehProdutoSalvo(valor: unknown): valor is Produto {
  if (typeof valor !== 'object' || valor === null) return false;
  return 'id' in valor && typeof valor.id === 'number' &&
    'nome' in valor && typeof valor.nome === 'string' &&
    'descricao' in valor && typeof valor.descricao === 'string' &&
    'preco' in valor && typeof valor.preco === 'number' &&
    'precoPromocional' in valor && typeof valor.precoPromocional === 'number';
}

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly itens = signal<Produto[]>([]);
  readonly produtos = this.itens.asReadonly();

  constructor() {
    afterNextRender(() => this.carregar());
  }

  contem(id: number): boolean {
    return this.itens().some((produto) => produto.id === id);
  }

  alternar(produto: Produto): void {
    if (this.contem(produto.id)) {
      this.remover(produto.id);
      return;
    }

    this.itens.update((atuais) => [...atuais, produto]);
    this.salvar();
  }

  remover(id: number): void {
    this.itens.update((atuais) => atuais.filter((produto) => produto.id !== id));
    this.salvar();
  }

  limpar(): void {
    this.itens.set([]);
    this.salvar();
  }

  private carregar(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      const salvos: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      if (!Array.isArray(salvos)) return;

      const itensValidos = salvos.flatMap((salvo) => {
        if (typeof salvo === 'number') {
          const produto = produtosPorId.get(salvo);
          return produto ? [produto] : [];
        }
        return ehProdutoSalvo(salvo) ? [salvo] : [];
      });
      this.itens.set([...new Map(itensValidos.map((produto) => [produto.id, produto])).values()]);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  private salvar(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.itens()));
    } catch {
      // O carrinho continua funcionando durante a sessão se o armazenamento estiver indisponível.
    }
  }
}