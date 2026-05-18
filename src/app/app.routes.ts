import { Routes } from '@angular/router';
import { BookEntryComponent } from './book-entry/book-entry.component';
import { HomeComponent } from './home/home.component';
import { ShoppingComponent } from './shopping/shopping.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'book', component: BookEntryComponent },
  { path: 'shopping', component: ShoppingComponent },
];
