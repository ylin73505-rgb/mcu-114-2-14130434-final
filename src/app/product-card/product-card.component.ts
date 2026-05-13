import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [DecimalPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  readonly title = input('A 產品');
  readonly authors = input('作者 A、作者 B、作者 C');
  readonly publisher = input('博碩文化');
  readonly price = input(1580);
}
