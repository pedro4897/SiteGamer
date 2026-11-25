import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CarrinhoService } from '../model/carrinho.service';
import { AuthService } from '../model/auth.service';
import { LojinhaApiService } from '../model/lojinha-api.service';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  selector: 'app-cesta',
  styleUrl: './cesta.css',
  templateUrl: './cesta.html',
})
export class Cesta {
  readonly carrinho = inject(CarrinhoService);
  readonly auth = inject(AuthService);
  private readonly api = inject(LojinhaApiService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  checkoutAberto = false;
  enviandoPedido = false;
  mensagemErro = '';
  mensagemSucesso = '';

  readonly pedidoForm = this.formBuilder.nonNullable.group({
    entrega: ['', Validators.required],
    obs: [''],
  });

  get produtos() {
    return this.carrinho.produtos();
  }

  get totalProdutos(): number {
    return this.produtos.reduce((total, produto) => total + produto.preco, 0);
  }

  get totalCompra(): number {
    return this.produtos.reduce((total, produto) => total + produto.precoPromocional, 0);
  }

  get totalEconomizado(): number {
    return this.produtos.reduce((total, produto) => total + (produto.preco - produto.precoPromocional), 0);
  }

  remover(id: number): void {
    this.carrinho.remover(id);
  }

  limpar(): void {
    this.carrinho.limpar();
  }

  abrirFinalizacao(): void {
    const cliente = this.auth.cliente();
    if (!cliente) {
      void this.router.navigate(['/Login']);
      return;
    }

    this.pedidoForm.controls.entrega.setValue(cliente.logradouro);
    this.checkoutAberto = true;
    this.mensagemErro = '';
    this.mensagemSucesso = '';
  }

  finalizarCompra(): void {
    if (this.pedidoForm.invalid) {
      this.pedidoForm.markAllAsTouched();
      return;
    }

    const cliente = this.auth.cliente();
    if (!cliente) {
      void this.router.navigate(['/Login']);
      return;
    }

    this.enviandoPedido = true;
    this.mensagemErro = '';
    const { entrega, obs } = this.pedidoForm.getRawValue();
    this.api.criarPedido({
      valorTotal: this.totalCompra,
      entrega,
      obs,
      dataPedido: new Date().toISOString().slice(0, 10),
      codigoCliente: cliente.codigo,
      itens: this.produtos.map((produto) => ({
        codigoProduto: produto.id,
        quantidade: 1,
        valor: produto.precoPromocional,
      })),
    }).subscribe({
      next: (resposta) => {
        this.enviandoPedido = false;
        this.mensagemSucesso = resposta || 'Pedido registrado com sucesso.';
        this.checkoutAberto = false;
        this.carrinho.limpar();
      },
      error: (error: unknown) => {
        this.enviandoPedido = false;
        this.mensagemErro = error instanceof Error && error.message
          ? `Não foi possível registrar o pedido: ${error.message}`
          : 'Não foi possível registrar o pedido. Confira se o backend está ativo.';
      },
    });
  }
}
