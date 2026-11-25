import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../model/auth.service';
import { LojinhaApiService } from '../model/lojinha-api.service';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private readonly formBuilder = inject(FormBuilder);
  private readonly api = inject(LojinhaApiService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  submitted = false;
  salvando = false;
  mensagemErro = '';

  loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required]
  });

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.salvando = true;
    this.mensagemErro = '';
    const { email, senha } = this.loginForm.getRawValue();
    this.api.fazerLogin(email, senha).subscribe({
      next: (cliente) => {
        this.salvando = false;
        if (!cliente.codigo) {
          this.mensagemErro = 'Email ou senha inválidos.';
          return;
        }

        this.auth.entrar({
          codigo: cliente.codigo,
          nome: cliente.nome,
          email: cliente.email,
          logradouro: cliente.logradouro ?? '',
        });
        void this.router.navigate(['/Pedidos']);
      },
      error: (error: unknown) => {
        this.salvando = false;
        this.mensagemErro = error instanceof Error && error.message
          ? `Não foi possível fazer login: ${error.message}`
          : 'Não foi possível fazer login. Confira se o backend está ativo.';
      },
    });
  }
}
