import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { HardComponent } from '../hard/hard.component';

@Component({
  selector: 'app-shopping',
  imports: [CommonModule, HardComponent],
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingComponent {
  readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  readonly customerName = signal('');
  readonly customerAddress = signal('');
  readonly customerPhone = signal('');

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
  readonly isBasicInfoComplete = computed(() => {
    return [this.customerName(), this.customerAddress(), this.customerPhone()].every((value) => value.trim().length > 0);
  });
  readonly canSubmit = computed(() => this.cartItems().length > 0 && this.isBasicInfoComplete());

  updateCustomerName(value: string): void {
    this.customerName.set(value);
  }

  updateCustomerAddress(value: string): void {
    this.customerAddress.set(value);
  }

  updateCustomerPhone(value: string): void {
    this.customerPhone.set(value);
  }

  updateQuantity(title: string, qty: number): void {
    const q = Number.isFinite(qty) ? Math.max(0, Math.floor(qty)) : 0;
    this.cartService.updateQuantity(title, q);
  }

  removeItem(title: string): void {
    this.cartService.removeItem(title);
  }

  submitOrder(event?: Event): void {
    event?.preventDefault();

    if (!this.canSubmit()) {
      return;
    }

    // simple demo behaviour: clear cart and navigate home
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }
}
