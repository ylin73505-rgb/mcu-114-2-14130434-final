import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { BookEntryComponent } from './app/book-entry/book-entry.component';

bootstrapApplication(BookEntryComponent, appConfig).catch((err) => console.error(err));
