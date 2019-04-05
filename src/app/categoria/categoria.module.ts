import { CategoriaRoutingModule } from './categoria.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaPesquisaComponent } from './categoria-pesquisa/categoria-pesquisa.component';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/components/table/table';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { CardModule } from 'primeng/components/card/card';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoriaPesquisaComponent],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CardModule,
    InputTextareaModule,
  ]
})
export class CategoriaModule { }
