import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { HardComponent } from '../hard/hard.component';

@Component({
  selector: 'app-shopping',
  imports: [CommonModule, HardComponent],
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
})
export class ShoppingComponent {
  checkout() {
    this.submitOrder();
  }
  totalPrice(): string | number {
    return this.total();
  }
  readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  readonly cartItems = computed(() => {
    const items = this.cartService.getItems();
    return Object.entries(items).map(([title, entry]) => ({
      title,
      quantity: entry.quantity,
      price: entry.price,
      subtotal: entry.quantity * entry.price,
    }));
  });

  readonly total = computed(() => this.cartItems().reduce((s, i) => s + i.subtotal, 0));

  updateQuantity(title: string, qty: number): void {
    const q = Number.isFinite(qty) ? Math.max(0, Math.floor(qty)) : 0;
    this.cartService.updateQuantity(title, q);
  }

  removeItem(title: string): void {
    this.cartService.removeItem(title);
  }

  submitOrder(): void {
    // simple demo behaviour: clear cart and navigate home
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
