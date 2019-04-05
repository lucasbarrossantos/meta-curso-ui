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
import { CategoriaCadastroComponent } from './categoria-cadastro/categoria-cadastro.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CategoriaPesquisaComponent, CategoriaCadastroComponent],
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
    SharedModule
  ]
})
export class CategoriaModule { }
