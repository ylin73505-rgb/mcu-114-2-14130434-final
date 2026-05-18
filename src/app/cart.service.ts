import { Injectable, OnDestroy, signal } from '@angular/core';

const STORAGE_KEY = 'cart.items';

interface CartItemEntry {
  quantity: number;
  price: number;
}

interface CartItem {
  [key: string]: CartItemEntry;
}

@Injectable({ providedIn: 'root' })
export class CartService implements OnDestroy {
  private readonly cartItems = signal<CartItem>({});
  readonly cartCount = signal<number>(0);

  constructor() {
    try {
      const raw = typeof window === 'undefined' ? null : window.localStorage.getItem(STORAGE_KEY);
      const initial = raw ? JSON.parse(raw) : {};
      this.cartItems.set(initial);
      this.updateCartCount();
    } catch {
      this.cartItems.set({});
      this.cartCount.set(0);
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.onStorage);
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', this.onStorage);
    }
  }

  private onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      const val = e.newValue ? JSON.parse(e.newValue) : {};
      this.cartItems.set(val);
      this.updateCartCount();
    }
  };

  private updateCartCount(): void {
    const items = this.cartItems();
    const uniqueCount = Object.keys(items).length;
    this.cartCount.set(uniqueCount);
  }

  addItem(productTitle: string, price: number): void {
    this.cartItems.update((items) => {
      const updated = { ...items } as CartItem;
      const existing = updated[productTitle];
      if (existing) {
        updated[productTitle] = { quantity: existing.quantity + 1, price: existing.price };
      } else {
        updated[productTitle] = { quantity: 1, price };
      }
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        }
      } catch {
        // ignore
      }
      this.updateCartCount();
      return updated;
    });
  }

  updateQuantity(productTitle: string, quantity: number): void {
    this.cartItems.update((items) => {
      const updated = { ...items } as CartItem;
      if (updated[productTitle]) {
        if (quantity <= 0) {
          delete updated[productTitle];
        } else {
          updated[productTitle] = { quantity, price: updated[productTitle].price };
        }
      }
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        }
      } catch {
        // ignore
      }
      this.updateCartCount();
      return updated;
    });
  }

  removeItem(productTitle: string): void {
    this.cartItems.update((items) => {
      const updated = { ...items } as CartItem;
      if (updated[productTitle]) {
        delete updated[productTitle];
      }
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        }
      } catch {
        // ignore
      }
      this.updateCartCount();
      return updated;
    });
  }

  clearCart(): void {
    this.cartItems.set({});
    this.updateCartCount();
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
      }
    } catch {
      // ignore
    }
  }

  getItems(): CartItem {
    return this.cartItems();
  }
}
