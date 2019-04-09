import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';
import { SharedModule } from '../shared/shared.module';
import { AlunoCadastroComponent } from './aluno-cadastro/aluno-cadastro.component';
import { AlunoRoutingModule } from './aluno.routing';
import { AlunoPesquisaComponent } from './aluno-pesquisa/aluno-pesquisa.component';

@NgModule({
  declarations: [AlunoCadastroComponent, AlunoPesquisaComponent],
  imports: [
    CommonModule,
    AlunoRoutingModule,
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
    CheckboxModule,
    SharedModule
  ]
})
export class AlunoModule { }
