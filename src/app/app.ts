import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './model/auth.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('SiteGamer');
  readonly auth = inject(AuthService);
  searchTerm = '';

  private readonly router = inject(Router);

  onSearch(): void {
    const query = this.searchTerm.trim();
    this.router.navigate(['/busca'], { queryParams: { q: query || null } });
  }

  sair(): void {
    this.auth.sair();
    void this.router.navigate(['/Login']);
  }
}