import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  selector: 'app-esqueci',
  styleUrl: './esqueci.css',
  templateUrl: './esqueci.html',
})
export class Esqueci {
  private readonly formBuilder = inject(FormBuilder);
  enviado = false;

  recuperacaoForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit(): void {
    if (this.recuperacaoForm.invalid) {
      this.recuperacaoForm.markAllAsTouched();
      this.enviado = false;
      return;
    }

    this.enviado = true;
  }
}
