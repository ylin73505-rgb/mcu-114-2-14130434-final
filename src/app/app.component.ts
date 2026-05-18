import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { HardComponent } from './hard/hard.component';

const PRODUCTS_PER_PAGE = 5;

interface Product {
  title: string;
  authors: string;
  publisher: string;
  price: number;
}

@Component({
  selector: 'app-root',
  imports: [ProductCardComponent, HardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly products: Product[] = [
    { title: 'A 產品', authors: '作者 A、作者 B、作者 C', publisher: '博碩文化', price: 1580 },
    { title: 'B 產品', authors: '作者 A、作者 B、作者 C', publisher: '博碩文化', price: 1580 },
    { title: 'C 產品', authors: '作者 A、作者 B、作者 C', publisher: '博碩文化', price: 1580 },
    { title: 'D 產品', authors: '作者 A、作者 B、作者 C', publisher: '博碩文化', price: 1580 },
    { title: 'E 產品', authors: '作者 A、作者 B、作者 C', publisher: '博碩文化', price: 1580 },
    { title: 'F 產品', authors: '作者 A、作者 B、作者 C', publisher: '博碩文化', price: 1580 },
    { title: 'G 產品', authors: '作者 A、作者 B、作者 C', publisher: '博碩文化', price: 1580 },
    { title: 'H 產品', authors: '作者 A、作者 B、作者 C', publisher: '博碩文化', price: 1580 },
    { title: 'I 產品', authors: '作者 A、作者 B、作者 C', publisher: '博碩文化', price: 1580 },
    { title: 'J 產品', authors: '作者 A、作者 B、作者 C', publisher: '博碩文化', price: 1580 },
  ];

  readonly currentPage = signal(1);

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.products.length / PRODUCTS_PER_PAGE)));

  readonly pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, index) => index + 1));

  readonly visibleProducts = computed(() => {
    const startIndex = (this.currentPage() - 1) * PRODUCTS_PER_PAGE;
    return this.products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  });

  setPage(page: number): void {
    this.currentPage.set(page);
  }
}
