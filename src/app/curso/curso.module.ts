import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoCadastroComponent } from './curso-cadastro/curso-cadastro.component';
import { CursoRoutingModule } from './curso.routing';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/components/table/table';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { CardModule } from 'primeng/components/card/card';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { SharedModule } from '../shared/shared.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';


@NgModule({
  declarations: [CursoCadastroComponent],
  imports: [
    CommonModule,
    CursoRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CardModule,
    InputTextareaModule,
    DropdownModule,
    CurrencyMaskModule,
    SharedModule
  ]
})
export class CursoModule { }
