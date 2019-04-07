import { ProfessorRoutingModule } from './professor.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessorCadastroComponent } from './professor-cadastro/professor-cadastro.component';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/components/table/table';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { CardModule } from 'primeng/components/card/card';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { AccordionModule } from 'primeng/components/accordion/accordion';
import { SharedModule } from '../shared/shared.module';
import { ChipsModule } from 'primeng/components/chips/chips';
import { ProfessorPesquisaComponent } from './professor-pesquisa/professor-pesquisa.component';

@NgModule({
  declarations: [ProfessorCadastroComponent, ProfessorPesquisaComponent],
  imports: [
    CommonModule,
    ProfessorRoutingModule,
    FormsModule,
    InputTextModule,
    InputMaskModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CardModule,
    CalendarModule,
    InputTextareaModule,
    DropdownModule,
    AccordionModule,
    ChipsModule,
    SharedModule
  ]
})
export class ProfessorModule { }
