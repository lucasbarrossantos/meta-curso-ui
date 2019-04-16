import { TurmaService } from './../turma.service';
import { TurmaFilter } from './../../shared/model/filtros/turma.filter';
import { Turma } from '../../shared/model/turma.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastyService } from 'ng2-toasty';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { Title } from '@angular/platform-browser';
import { ErrorHandleService } from 'src/app/shared/core/error-handle.service';
import { EventEmitterService } from 'src/app/shared/utils/event.manager';

@Component({
  selector: 'app-turma-pesquisa',
  templateUrl: './turma-pesquisa.component.html',
  styleUrls: ['./turma-pesquisa.component.css']
})
export class TurmaPesquisaComponent implements OnInit, OnDestroy {

  turmas: Turma[];
  filtro = new TurmaFilter();
  totalRegistros = 0; // Qtd de registro do retorno da consulta
  @ViewChild('tabela') grid; // @ViewChild('?') recupera algum dado da view
  sub: Subscription;
  ativo = [
    { label: 'Todos', value: null },
    { label: 'Sim', value: '0' },
    { label: 'Não', value: 1 }
  ];
  pt = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  };

  constructor(
    private turmaService: TurmaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandle: ErrorHandleService,
    private title: Title
    ) {
      EventEmitterService.get('TurmaListModification').subscribe((data) => {
        this.grid.first = 0;
        this.pesquisar();
      });
    }

  ngOnInit() {
    this.title.setTitle('Pesquisa de turma');
    this.sub = EventEmitterService.get('TurmaListModification').subscribe( data => {} );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.turmaService.pesquisar( this.filtro ).subscribe((dados) => {
      this.totalRegistros = dados.total;
      this.turmas = dados.turmas.content;
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
    this.turmaService.excluir(codigo).subscribe((response) => {

      this.toasty.success({
        title: 'Exclusão de Turma',
        msg: 'Turma excluída com sucesso!',
        showClose: true,
        timeout: 5000
      });

      EventEmitterService.get('TurmaListModification').emit({
        nome: 'TurmaListModification',
        mensagem: 'Turma alterada.'
      });

    },
    (response) => this.errorHandle.handle(response.error[0].mensagemUsuario));
  }

  onMudarPagina(event: LazyLoadEvent) {
    const pagina = (event.first / event.rows);
    this.pesquisar(pagina);
  }

  limparFiltros() {
    this.filtro = new TurmaFilter();
  }

}
