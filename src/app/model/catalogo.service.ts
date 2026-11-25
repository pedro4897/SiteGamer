import { Injectable, inject, signal } from '@angular/core';
import { Produto } from './produto';
import { produtos as catalogoInicial } from './produtos';
import { LojinhaApiService, ProdutoApi } from './lojinha-api.service';

@Injectable({ providedIn: 'root' })
export class CatalogoService {
  private readonly api = inject(LojinhaApiService);
  private carregamentoIniciado = false;
  private readonly lista = signal<Produto[]>(catalogoInicial);
  readonly produtos = this.lista.asReadonly();
  readonly erro = signal<string | null>(null);

  carregar(): void {
    if (this.carregamentoIniciado) return;
    this.carregamentoIniciado = true;

    this.api.listarProdutos().subscribe({
      next: (produtos) => {
        this.lista.set(produtos.map((produto) => this.converterProduto(produto)));
        this.erro.set(null);
      },
      error: (error: unknown) => {
        this.erro.set(
          error instanceof Error && error.message
            ? `Não foi possível carregar os produtos da API: ${error.message}`
            : 'Não foi possível carregar os produtos da API. Confira se o backend está ativo em http://localhost:8081.'
        );
      },
    });
  }

  private converterProduto(produtoApi: ProdutoApi): Produto {
    const produtoSalvo = catalogoInicial.find(
      (produto) => produto.nome.toLocaleLowerCase() === produtoApi.nome.toLocaleLowerCase()
    );
    const preco = Number(produtoApi.valor) || 0;
    const precoPromocional = Number(produtoApi.valorPromo) || preco;

    return {
      ...produtoSalvo,
      id: produtoApi.codigo ?? produtoSalvo?.id ?? 0,
      nome: produtoApi.nome,
      titulo: produtoSalvo?.titulo ?? produtoApi.nome,
      descricao: produtoApi.descritivo || produtoSalvo?.descricao || '',
      descricaoDetalhada: produtoApi.descritivo || produtoSalvo?.descricaoDetalhada || '',
      preco,
      precoPromocional,
      imagem: produtoSalvo?.imagem,
      destaques: produtoSalvo?.destaques ?? [],
      termosBusca: produtoSalvo?.termosBusca ?? [],
    };
  }
}
