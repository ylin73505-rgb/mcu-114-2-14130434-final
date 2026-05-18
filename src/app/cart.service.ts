import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly cartCount = signal(0);

  addItem(): void {
    this.cartCount.update((count) => count + 1);
  }
}
