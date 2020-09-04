import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { NewCartComponent } from './new-cart/new-cart.component';
import { HeaderComponent } from './header/header.component';

// Library
// import { AngularSlideUpModule } from 'projects/angular-slide-up/src/lib/angular-slide-up.module';
// import { AngularSlideUpModule } from 'projects/angular-slide-up/src/public-api';
import { AngularSlideUpModule } from 'angular-slide-up';

@NgModule({
    declarations: [
        AppComponent,
        CardComponent,
        NewCartComponent,
        HeaderComponent,
    ],
    imports: [BrowserModule, AngularSlideUpModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
