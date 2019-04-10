import { DisciplinaRoutingModule } from './disciplina.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisciplinaCadastroComponent } from './disciplina-cadastro/disciplina-cadastro.component';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/components/table/table';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { CardModule } from 'primeng/components/card/card';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { SharedModule } from '../shared/shared.module';
import { DisciplinaPesquisaComponent } from './disciplina-pesquisa/disciplina-pesquisa.component';

@NgModule({
  declarations: [DisciplinaCadastroComponent, DisciplinaPesquisaComponent],
  imports: [
    CommonModule,
    DisciplinaRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CardModule,
    InputTextareaModule,
    DropdownModule,
    SharedModule
  ]
})
export class DisciplinaModule { }
