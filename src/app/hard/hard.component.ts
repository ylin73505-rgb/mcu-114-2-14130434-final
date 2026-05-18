import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-hard',
  imports: [CommonModule],
  templateUrl: './hard.component.html',
  styleUrl: './hard.component.scss',
})
export class HardComponent {
  readonly cartService = inject(CartService);
}
