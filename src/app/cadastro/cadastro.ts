import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LojinhaApiService } from '../model/lojinha-api.service';

function senhasConferem(control: AbstractControl): ValidationErrors | null {
  const senha = control.get('senha')?.value;
  const confirmarSenha = control.get('confirmarSenha')?.value;

  return senha === confirmarSenha ? null : { senhasDiferentes: true };
}

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  selector: 'app-cadastro',
  styleUrl: './cadastro.css',
  templateUrl: './cadastro.html',
})
export class Cadastro {
  private readonly formBuilder = inject(FormBuilder);
  private readonly api = inject(LojinhaApiService);
  private readonly router = inject(Router);
  submitted = false;
  salvando = false;
  mensagemErro = '';

  cadastroForm = this.formBuilder.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/)
    ]],
    cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/)]],
    telefone: ['', [Validators.required, Validators.pattern(/^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/)]],
    confirmarSenha: ['', Validators.required]
  }, { validators: senhasConferem });

  onSubmit(): void {
    this.submitted = true;
    if (this.cadastroForm.invalid) {
      this.cadastroForm.markAllAsTouched();
      return;
    }

    this.salvando = true;
    this.mensagemErro = '';
    const { nome, email, senha, cpf, telefone } = this.cadastroForm.getRawValue();
    this.api.criarCliente({
      nome,
      email,
      senha,
      documento: cpf,
      telefone,
      logradouro: '',
      ativo: 1,
    }).subscribe({
      next: () => {
        this.salvando = false;
        void this.router.navigate(['/Login'], {
          state: { mensagem: 'Cadastro realizado com sucesso. Entre na sua conta.' },
        });
      },
      error: (error: unknown) => {
        this.salvando = false;
        this.mensagemErro = error instanceof Error && error.message
          ? `Não foi possível salvar o cadastro: ${error.message}`
          : 'Não foi possível salvar o cadastro. Confira se o backend está ativo.';
      },
    });
  }
}
