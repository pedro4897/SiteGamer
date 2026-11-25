import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface ClienteApi {
  codigo?: number;
  nome: string;
  telefone: string;
  documento: string;
  senha: string;
  logradouro: string;
  email: string;
  ativo: number;
}

export interface ProdutoApi {
  codigo?: number;
  nome: string;
  descritivo: string;
  valor: number;
  valorPromo: number;
  quantidade: number;
  destaque: number;
}

export interface PedidoApi {
  codigoPedido?: number;
  valorTotal: number;
  entrega: string;
  obs: string;
  dataPedido: string;
  codigoCliente: number;
  itens?: ItemPedidoApi[];
}

export interface ItemPedidoApi {
  codigoItemPedido?: number;
  codigoProduto: number;
  quantidade: number;
  valor: number;
}

@Injectable({ providedIn: 'root' })
export class LojinhaApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8081/api';

  criarCliente(cliente: ClienteApi): Observable<string> {
    return this.http.post(`${this.baseUrl}/cliente`, cliente, { responseType: 'text' });
  }

  fazerLogin(email: string, senha: string): Observable<ClienteApi> {
    return this.http.post<ClienteApi>(`${this.baseUrl}/cliente/login`, { email, senha });
  }

  listarProdutos(): Observable<ProdutoApi[]> {
    return this.http.get<ProdutoApi[]>(`${this.baseUrl}/produtos`);
  }

  criarProduto(produto: ProdutoApi): Observable<string> {
    return this.http.post(`${this.baseUrl}/produto`, produto, { responseType: 'text' });
  }

  alterarProduto(produto: ProdutoApi & { codigo: number }): Observable<string> {
    return this.http.put(`${this.baseUrl}/produto`, produto, { responseType: 'text' });
  }

  criarPedido(pedido: PedidoApi): Observable<string> {
    return this.http.post(`${this.baseUrl}/pedido`, pedido, { responseType: 'text' });
  }

  listarPedidosDoCliente(codigoCliente: number): Observable<PedidoApi[]> {
    return this.http.get<PedidoApi[]>(`${this.baseUrl}/pedidos/cliente/${codigoCliente}`);
  }

  alterarPedido(pedido: PedidoApi & { codigoPedido: number }): Observable<string> {
    return this.http.put(`${this.baseUrl}/pedido`, pedido, { responseType: 'text' });
  }
}
