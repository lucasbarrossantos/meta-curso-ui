import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaCadastroComponent } from './empresa-cadastro/empresa-cadastro.component';
import { EmpresaRoutingModule } from './empresa.routing';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/components/table/table';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { CardModule } from 'primeng/components/card/card';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { SharedModule } from '../shared/shared.module';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { AccordionModule } from 'primeng/components/accordion/accordion';

@NgModule({
  declarations: [EmpresaCadastroComponent],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CardModule,
    InputTextareaModule,
    DropdownModule,
    InputMaskModule,
    AccordionModule,
    SharedModule
  ]
})
export class EmpresaModule { }
