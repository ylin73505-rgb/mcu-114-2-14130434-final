import { ChangeDetectionStrategy, Component, computed, signal, inject, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
  imports: [FormsModule, ProductCardComponent, HardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  readonly products = signal<Product[]>([]);
  readonly searchQuery = signal('');
  readonly tempSearchQuery = signal('');

  readonly currentPage = signal(1);

  readonly totalPages = computed(() => {
    const filtered = this.filteredProducts();
    return Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  });

  readonly pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, index) => index + 1));

  readonly filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) {
      return this.products();
    }
    return this.products().filter((p) => p.title.toLowerCase().includes(query) || p.authors.toLowerCase().includes(query));
  });

  readonly visibleProducts = computed(() => {
    const startIndex = (this.currentPage() - 1) * PRODUCTS_PER_PAGE;
    return this.filteredProducts().slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  });

  setPage(page: number): void {
    this.currentPage.set(page);
  }

  onSearch(): void {
    // Apply the search by updating searchQuery
    this.searchQuery.set(this.tempSearchQuery());
    const filtered = this.filteredProducts();

    // If only one product matches, navigate to detail page
    if (filtered.length === 1) {
      const product = filtered[0];
      this.router.navigate(['/book'], {
        queryParams: {
          title: product.title,
          authors: product.authors,
          publisher: product.publisher,
          price: product.price,
        },
      });
      return;
    }

    // Otherwise, reset to first page
    this.currentPage.set(1);
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
