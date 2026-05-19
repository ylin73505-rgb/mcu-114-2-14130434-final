import { ChangeDetectionStrategy, Component, computed, signal, inject, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductCardComponent } from '../product-card/product-card.component';
import { HardComponent } from '../hard/hard.component';

const PRODUCTS_PER_PAGE = 5;

interface Product {
  title: string;
  authors: string;
  publisher: string;
  price: number;
}

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, HardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);

  readonly products = signal<Product[]>([]);

  readonly currentPage = signal(1);

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.products().length / PRODUCTS_PER_PAGE)));

  readonly pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, index) => index + 1));

  readonly visibleProducts = computed(() => {
    const startIndex = (this.currentPage() - 1) * PRODUCTS_PER_PAGE;
    return this.products().slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  });

  setPage(page: number): void {
    this.currentPage.set(page);
  }

  constructor() {
    // load products from public assets/db.json and map to Product
    this.http.get<{ products: any[] }>('/assets/db.json').subscribe((data) => {
      const mapped: Product[] = (data.products || []).map((p) => ({
        title: p.name,
        authors: Array.isArray(p.authors) ? p.authors.join('、') : String(p.authors || ''),
        publisher: p.company || p.publisher || '',
        price: Number(p.price) || 0,
      }));
      this.products.set(mapped);
    });

    effect(() => {
      this.activatedRoute.queryParams.subscribe((params) => {
        const page = Number(params['page']);
        if (Number.isFinite(page) && page > 0) {
          this.currentPage.set(page);
        }
      });
    });
  }
}
