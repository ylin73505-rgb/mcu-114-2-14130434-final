import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

  readonly details = this.readDetails();
  readonly formattedPrice = this.details.price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  addToCart(): void {
    this.cartService.addItem();
  }

  private readDetails(): BookDetails {
    const query = typeof window === 'undefined' ? new URLSearchParams() : new URLSearchParams(window.location.search);

    const title = query.get('title') ?? 'A 產品';
    const authors = query.get('authors') ?? '作者 A、作者 B、作者 C';
    const publisher = query.get('publisher') ?? '博碩文化';
    const priceValue = Number(query.get('price'));

    return {
      title,
      authors,
      publisher,
      price: Number.isFinite(priceValue) ? priceValue : 1580,
    };
  }
}
