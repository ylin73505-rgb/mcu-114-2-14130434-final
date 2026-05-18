import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ShoppingComponent } from './app/shopping/shopping.component';

bootstrapApplication(ShoppingComponent, appConfig).catch((err) => console.error(err));
