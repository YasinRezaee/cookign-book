import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { TranslatePipe } from './app/Pipes/translate.pipe';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
