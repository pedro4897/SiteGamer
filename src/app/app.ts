import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('SiteGamer');
  searchTerm = '';

  private readonly router = inject(Router);

  onSearch(): void {
    const query = this.searchTerm.trim();
    this.router.navigate(['/busca'], { queryParams: { q: query || null } });
  }
}