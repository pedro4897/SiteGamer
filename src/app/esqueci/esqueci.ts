import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  
  submitted = false;
  private timeoutId: any = null

  loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit(): void {
    this.submitted = true;

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      this.timeoutId = setTimeout(() => {
        this.submitted = false;
      }, 4000);

      return;
    }
  
    console.log('Enviando e-mail para:', this.loginForm.value.email);
  }
}