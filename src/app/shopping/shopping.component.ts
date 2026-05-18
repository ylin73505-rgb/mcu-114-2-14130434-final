import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shopping',
  imports: [CommonModule],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.scss',
})
export class ShoppingComponent {
  readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  readonly cartItems = computed(() => {
    const items = this.cartService.getItems();
    return Object.entries(items).map(([title, quantity]) => ({
      title,
      quantity,
    }));
  });

  goHome(): void {
    this.router.navigate(['/']);
  }
}
