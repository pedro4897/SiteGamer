import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LojinhaApiService } from './lojinha-api.service';

describe('LojinhaApiService', () => {
  let api: LojinhaApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    api = TestBed.inject(LojinhaApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('sends customer and product creation requests to their POST endpoints', () => {
    api.criarCliente({
      nome: 'Cliente',
      telefone: '11999999999',
      documento: '12345678900',
      senha: 'Senha123!',
      logradouro: '',
      email: 'cliente@exemplo.com',
      ativo: 1,
    }).subscribe();
    const cliente = http.expectOne('http://localhost:8081/api/cliente');
    expect(cliente.request.method).toBe('POST');
    cliente.flush('Cliente gravado com sucesso!');

    api.criarProduto({
      nome: 'Jogo',
      descritivo: 'Descrição',
      valor: 50,
      valorPromo: 25,
      quantidade: 3,
      destaque: 1,
    }).subscribe();
    const produto = http.expectOne('http://localhost:8081/api/produto');
    expect(produto.request.method).toBe('POST');
    produto.flush('Produto gravado com sucesso!');
  });

  it('loads products and posts an order with its items', () => {
    api.listarProdutos().subscribe();
    const lista = http.expectOne('http://localhost:8081/api/produtos');
    expect(lista.request.method).toBe('GET');
    lista.flush([]);

    api.criarPedido({
      valorTotal: 25,
      entrega: 'Rua e número',
      obs: '',
      dataPedido: '2026-11-22',
      codigoCliente: 1,
      itens: [{ codigoProduto: 2, quantidade: 1, valor: 25 }],
    }).subscribe();
    const pedido = http.expectOne('http://localhost:8081/api/pedido');
    expect(pedido.request.method).toBe('POST');
    expect(pedido.request.body.itens).toEqual([
      { codigoProduto: 2, quantidade: 1, valor: 25 },
    ]);
    pedido.flush('Pedido gravado com sucesso!');
  });

  it('updates an existing product with PUT and its code', () => {
    const produto = {
      codigo: 4,
      nome: 'Jogo atualizado',
      descritivo: 'Descrição atualizada',
      valor: 60,
      valorPromo: 30,
      quantidade: 8,
      destaque: 1,
    };

    api.alterarProduto(produto).subscribe();

    const requisicao = http.expectOne('http://localhost:8081/api/produto');
    expect(requisicao.request.method).toBe('PUT');
    expect(requisicao.request.body).toEqual(produto);
    requisicao.flush('Produto alterado com sucesso! 4');
  });

  it('lists orders for one customer and updates an existing order', () => {
    api.listarPedidosDoCliente(7).subscribe();
    const lista = http.expectOne('http://localhost:8081/api/pedidos/cliente/7');
    expect(lista.request.method).toBe('GET');
    lista.flush([]);

    const pedido = {
      codigoPedido: 12,
      valorTotal: 50,
      entrega: 'Rua atualizada',
      obs: 'Atualização via Postman',
      dataPedido: '2026-11-22',
      codigoCliente: 7,
      itens: [{ codigoProduto: 3, quantidade: 2, valor: 25 }],
    };
    api.alterarPedido(pedido).subscribe();

    const atualizacao = http.expectOne('http://localhost:8081/api/pedido');
    expect(atualizacao.request.method).toBe('PUT');
    expect(atualizacao.request.body).toEqual(pedido);
    atualizacao.flush('Pedido alterado com sucesso! 12');
  });
});
