import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../model/auth.service';
import { LojinhaApiService, PedidoApi } from '../model/lojinha-api.service';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-pedidos',
  styleUrl: './pedidos.css',
  templateUrl: './pedidos.html',
})
export class Pedidos {
  readonly auth = inject(AuthService);
  private readonly api = inject(LojinhaApiService);
  readonly pedidos = signal<PedidoApi[]>([]);
  readonly carregando = signal(true);
  readonly mensagemErro = signal('');

  private readonly carregarPedidosDaConta = effect(() => {
    if (!this.auth.inicializada()) {
      this.carregando.set(true);
      return;
    }

    const cliente = this.auth.cliente();
    if (!cliente) {
      this.pedidos.set([]);
      this.carregando.set(false);
      return;
    }

    this.carregando.set(true);
    this.mensagemErro.set('');
    this.api.listarPedidosDoCliente(cliente.codigo).subscribe({
      next: (pedidos) => {
        this.pedidos.set(pedidos);
        this.carregando.set(false);
      },
      error: (error: unknown) => {
        console.error('Não foi possível carregar os pedidos do cliente.', error);
        this.mensagemErro.set('Não foi possível carregar seus pedidos. Confira se a API está disponível e tente novamente.');
        this.carregando.set(false);
      },
    });
  });
}
