import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

const CLIENTE_STORAGE_KEY = 'sitegamer-cliente';

export interface ClienteSessao {
  codigo: number;
  nome: string;
  email: string;
  logradouro: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly clienteAtual = signal<ClienteSessao | null>(null);
  private readonly estadoCarregado = signal(false);
  readonly cliente = this.clienteAtual.asReadonly();
  readonly inicializada = this.estadoCarregado.asReadonly();

  constructor() {
    afterNextRender(() => {
      this.carregar();
      this.estadoCarregado.set(true);
    });
  }

  entrar(cliente: ClienteSessao): void {
    this.clienteAtual.set(cliente);
    this.estadoCarregado.set(true);
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(CLIENTE_STORAGE_KEY, JSON.stringify(cliente));
    }
  }

  sair(): void {
    this.clienteAtual.set(null);
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(CLIENTE_STORAGE_KEY);
    }
  }

  private carregar(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const salvo = sessionStorage.getItem(CLIENTE_STORAGE_KEY);
    if (!salvo) return;

    try {
      const cliente: unknown = JSON.parse(salvo);
      if (
        typeof cliente === 'object' &&
        cliente !== null &&
        'codigo' in cliente &&
        typeof cliente.codigo === 'number' &&
        'nome' in cliente &&
        typeof cliente.nome === 'string' &&
        'email' in cliente &&
        typeof cliente.email === 'string' &&
        'logradouro' in cliente &&
        typeof cliente.logradouro === 'string'
      ) {
        this.clienteAtual.set({
          codigo: cliente.codigo,
          nome: cliente.nome,
          email: cliente.email,
          logradouro: cliente.logradouro,
        });
      } else {
        sessionStorage.removeItem(CLIENTE_STORAGE_KEY);
      }
    } catch (error) {
      sessionStorage.removeItem(CLIENTE_STORAGE_KEY);
      console.error('Não foi possível carregar a sessão do cliente.', error);
    }
  }
}
