import { MaterialRoutingModule } from './material.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCadastroComponent } from './material-cadastro/material-cadastro.component';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/components/table/table';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { CardModule } from 'primeng/components/card/card';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SharedModule } from '../shared/shared.module';
import { MaterialPesquisaComponent } from './material-pesquisa/material-pesquisa.component';

@NgModule({
  declarations: [MaterialCadastroComponent, MaterialPesquisaComponent],
  imports: [
    CommonModule,
    MaterialRoutingModule,
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
export class MaterialModule { }
