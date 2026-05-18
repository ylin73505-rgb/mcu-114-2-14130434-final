import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HardComponent } from '../hard/hard.component';

@Component({
  selector: 'app-book-root',
  imports: [HardComponent],
  templateUrl: './book-entry.component.html',
  styleUrl: './book-entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookEntryComponent {}
