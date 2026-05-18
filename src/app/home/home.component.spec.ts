import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { HardComponent } from '../hard/hard.component';

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
export class HomeComponent {}
