import { LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { registerLocaleData, CommonModule } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';

// PrimeNg
import { MenubarModule } from 'primeng/components/menubar/menubar';
import { ButtonModule } from 'primeng/components/button/button';
import { CoreModule } from './shared/core/core.module';
import { ConfirmationService } from 'primeng/components/common/api';
import { EventEmitterService } from './shared/utils/event.manager';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,

    // PrimeNg
    MenubarModule,
    ButtonModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt' },
    ConfirmationService,
    EventEmitterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
