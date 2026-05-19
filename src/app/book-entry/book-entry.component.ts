import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HardComponent } from '../hard/hard.component';
import { CartService } from '../cart.service';

interface BookDetails {
  title: string;
  authors: string;
  publisher: string;
  price: number;
}

@Component({
  selector: 'app-book-root',
  imports: [HardComponent],
  templateUrl: './book-entry.component.html',
  styleUrl: './book-entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookEntryComponent {
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly details = this.readDetails();
  readonly formattedPrice = this.details.price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  readonly currentPage = this.readPage();

  addToCart(): void {
    this.cartService.addItem(this.details.title, this.details.price);
  }

  goHome(): void {
    if (this.currentPage > 1) {
      this.router.navigate(['/'], { queryParams: { page: this.currentPage } });
    } else {
      this.router.navigate(['/']);
    }
  }

  private readDetails(): BookDetails {
    const query = this.route.snapshot.queryParamMap;
    const title = query.get('title') ?? 'A 產品';
    const authors = query.get('authors') ?? '作者 A、作者 B、作者 C';
    const publisher = query.get('publisher') ?? '博碩文化';
    const priceValue = this.readNumberParam(query.get('price'));

    return {
      title,
      authors,
      publisher,
      price: priceValue ?? 1580,
    };
  }

  private readPage(): number {
    const pageValue = this.readNumberParam(this.route.snapshot.queryParamMap.get('page'));
    return pageValue && pageValue > 0 ? pageValue : 1;
  }

  private readNumberParam(rawValue: string | null): number | null {
    if (rawValue === null || rawValue.trim() === '') {
      return null;
    }

    const parsedValue = Number(rawValue);
    return Number.isFinite(parsedValue) ? parsedValue : null;
  }
}
