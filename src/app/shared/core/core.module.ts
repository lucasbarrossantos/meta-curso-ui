import { Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ToastyModule
import {ToastyModule} from 'ng2-toasty';

import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    ConfirmDialogModule,

    // ToastyModule
    ToastyModule.forRoot()
  ],
  exports: [
    ConfirmDialogModule,

    // ToastyModule
    ToastyModule
  ],
  providers: [
    Title
  ]
})
export class CoreModule { }
