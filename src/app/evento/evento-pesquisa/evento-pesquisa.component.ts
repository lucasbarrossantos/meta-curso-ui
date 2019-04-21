import { EventoService } from './../evento.service';
import { EventoFilter } from './../../shared/model/filtros/evento.filter';
import { Evento } from '../../shared/model/evento.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastyService } from 'ng2-toasty';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { Title } from '@angular/platform-browser';
import { ErrorHandleService } from 'src/app/shared/core/error-handle.service';
import { EventEmitterService } from 'src/app/shared/utils/event.manager';
import * as moment from 'moment';

@Component({
  selector: 'app-evento-pesquisa',
  templateUrl: './evento-pesquisa.component.html',
  styleUrls: ['./evento-pesquisa.component.css']
})
export class EventoPesquisaComponent implements OnInit, OnDestroy {

  eventos: Evento[];
  filtro = new EventoFilter();
  totalRegistros = 0; // Qtd de registro do retorno da consulta
  @ViewChild('tabela') grid; // @ViewChild('?') recupera algum dado da view
  sub: Subscription;

  constructor(
    private eventoService: EventoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandle: ErrorHandleService,
    private title: Title
    ) {
      EventEmitterService.get('EventoListModification').subscribe((data) => {
        this.grid.first = 0;
        this.pesquisar();
      });
    }

  ngOnInit() {
    this.title.setTitle('Pesquisa de evento');
    this.sub = EventEmitterService.get('EventoListModification').subscribe( data => {} );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.eventoService.pesquisar( this.filtro ).subscribe((dados) => {
      this.totalRegistros = dados.total;
      this.eventos = dados.eventos;
    }, (error) => this.errorHandle.handle(error));
  }

  confirmExclusao(codigo: number, parametro: any) {
    this.confirmation.confirm({
        message: `Deseja realmente excluir ${parametro} ?`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-question-circle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
            this.excluir(codigo);
        }
    });
  }

  excluir(codigo: any) {
    this.eventoService.excluir(codigo).subscribe((response) => {

      this.toasty.success('Evento excluída com sucesso!');

      EventEmitterService.get('EventoListModification').emit({
        nome: 'EventoListModification',
        mensagem: 'Evento alterada.'
      });

    },
    (response) => this.errorHandle.handle(response.error[0].mensagemUsuario));
  }

  onMudarPagina(event: LazyLoadEvent) {
    const pagina = (event.first / event.rows);
    this.pesquisar(pagina);
  }

  eventoVencido(data: Date): boolean {
    return moment(moment(data).format('YYYY-MM-DD')).isBefore(moment(new Date()).format('YYYY-MM-DD'));
  }

}
