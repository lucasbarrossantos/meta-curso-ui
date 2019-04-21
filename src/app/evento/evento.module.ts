import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventoCadastroComponent } from './evento-cadastro/evento-cadastro.component';
import { EventoRoutingModule } from './evento.routing';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/components/table/table';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { CardModule } from 'primeng/components/card/card';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { EventoPesquisaComponent } from './evento-pesquisa/evento-pesquisa.component';

@NgModule({
  declarations: [EventoCadastroComponent, EventoPesquisaComponent],
  imports: [
    CommonModule,
    EventoRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CardModule,
    InputTextareaModule,
    InputMaskModule,
    CalendarModule,
    SharedModule
  ]
})
export class EventoModule { }
