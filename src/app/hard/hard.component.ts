import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-hard',
  imports: [CommonModule],
  templateUrl: './hard.component.html',
  styleUrl: './hard.component.scss',
})
export class HardComponent {
  readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  get isShoppingPage(): boolean {
    return this.router.url === '/shopping';
  }

  goToCart(): void {
    this.router.navigate(['/shopping']);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
