import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hard',
  imports: [CommonModule],
  templateUrl: './hard.component.html',
  styleUrl: './hard.component.scss',
})
export class HardComponent {
  cartCount = signal(0);
}
