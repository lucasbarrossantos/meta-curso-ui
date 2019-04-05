import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,

    // PrimeNg
    MenubarModule,
    ButtonModule
  ],
  providers: [
    ConfirmationService,
    EventEmitterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
