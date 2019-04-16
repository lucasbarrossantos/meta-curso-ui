import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurmaCadastroComponent } from './turma-cadastro/turma-cadastro.component';
import { TurmaRoutingModule } from './turma.routing';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/components/table/table';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { CardModule } from 'primeng/components/card/card';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { SharedModule } from '../shared/shared.module';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { TurmaPesquisaComponent } from './turma-pesquisa/turma-pesquisa.component';

@NgModule({
  declarations: [TurmaCadastroComponent, TurmaPesquisaComponent],
  imports: [
    CommonModule,
    DropdownModule,
    TurmaRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CardModule,
    InputMaskModule,
    CalendarModule,
    InputTextareaModule,
    SharedModule
  ]
})
export class TurmaModule { }
