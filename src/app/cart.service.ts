import { Injectable, OnDestroy, signal } from '@angular/core';

const STORAGE_KEY = 'cart.count';

@Injectable({ providedIn: 'root' })
export class CartService implements OnDestroy {
  readonly cartCount = signal<number>(0);

  constructor() {
    // initialize from localStorage if available
    try {
      const raw = typeof window === 'undefined' ? null : window.localStorage.getItem(STORAGE_KEY);
      const initial = raw ? parseInt(raw, 10) || 0 : 0;
      this.cartCount.set(initial);
    } catch {
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
      const val = e.newValue ? parseInt(e.newValue, 10) || 0 : 0;
      this.cartCount.set(val);
    }
  };

  addItem(): void {
    // update signal and persist
    this.cartCount.update((count) => {
      const next = count + 1;
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(STORAGE_KEY, String(next));
        }
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }

  setCount(n: number): void {
    this.cartCount.set(n);
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, String(n));
      }
    } catch {
      // ignore
    }
  }
}
