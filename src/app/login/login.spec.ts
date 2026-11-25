import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  afterEach(() => http.verify());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sends an existing password without applying registration strength rules', () => {
    component.loginForm.setValue({ email: 'cliente@exemplo.com', senha: 'senha-antiga' });

    component.onSubmit();

    const request = http.expectOne('http://localhost:8081/api/cliente/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ email: 'cliente@exemplo.com', senha: 'senha-antiga' });
    request.flush({
      codigo: 0,
      nome: '',
      telefone: '',
      documento: '',
      senha: '',
      logradouro: '',
      email: '',
      ativo: 0,
    });
  });
});
