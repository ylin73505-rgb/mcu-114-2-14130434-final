import { Component, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-card',
  imports: [DecimalPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  readonly title = input('A 產品');
  readonly authors = input('作者 A、作者 B、作者 C');
  readonly publisher = input('博碩文化');
  readonly price = input(1580);

  viewDetails(): void {
    this.router.navigate(['/book'], {
      queryParams: {
        title: this.title(),
        authors: this.authors(),
        publisher: this.publisher(),
        price: this.price(),
      },
    });
  }

  addToCart(): void {
    this.cartService.addItem();
  }
}
