import { Component } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { HardComponent } from './hard/hard.component';

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
})
export class App {
  products: Product[] = [
    { title: 'A 產品', authors: '作者 A、作者 B、作者 C', publisher: '博碩文化', price: 1580 },
    { title: 'B 產品', authors: '作者 A、作者 B、作者 C', publisher: '博碩文化', price: 1580 },
    { title: 'C 產品', authors: '作者 A、作者 B、作者 C', publisher: '博碩文化', price: 1580 },
    { title: 'D 產品', authors: '作者 A、作者 B、作者 C', publisher: '博碩文化', price: 1580 },
    { title: 'E 產品', authors: '作者 A、作者 B、作者 C', publisher: '博碩文化', price: 1580 },
  ];
}
