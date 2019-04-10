import { DisciplinaService } from './../disciplina.service';
import { DisciplinaFilter } from './../../shared/model/filtros/disciplina.filter';
import { Disciplina } from '../../shared/model/disciplina.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastyService } from 'ng2-toasty';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { Title } from '@angular/platform-browser';
import { ErrorHandleService } from 'src/app/shared/core/error-handle.service';
import { EventEmitterService } from 'src/app/shared/utils/event.manager';

@Component({
  selector: 'app-disciplina-pesquisa',
  templateUrl: './disciplina-pesquisa.component.html',
  styleUrls: ['./disciplina-pesquisa.component.css']
})
export class DisciplinaPesquisaComponent implements OnInit, OnDestroy {

  disciplinas: Disciplina[];
  filtro = new DisciplinaFilter();
  totalRegistros = 0; // Qtd de registro do retorno da consulta
  @ViewChild('tabela') grid; // @ViewChild('?') recupera algum dado da view
  sub: Subscription;

  constructor(
    private disciplinaService: DisciplinaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandle: ErrorHandleService,
    private title: Title
    ) {
      EventEmitterService.get('DisciplinaListModification').subscribe((data) => {
        this.grid.first = 0;
        this.pesquisar();
      });
    }

  ngOnInit() {
    this.title.setTitle('Pesquisa de disciplina');
    this.sub = EventEmitterService.get('DisciplinaListModification').subscribe( data => {} );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.disciplinaService.pesquisar( this.filtro ).subscribe((dados) => {
      this.totalRegistros = dados.total;
      this.disciplinas = dados.disciplinas;
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
    this.disciplinaService.excluir(codigo).subscribe((response) => {

      this.toasty.success({
        title: 'Exclusão de Disciplina',
        msg: 'Disciplina excluída com sucesso!',
        showClose: true,
        timeout: 5000
      });

      EventEmitterService.get('DisciplinaListModification').emit({
        nome: 'DisciplinaListModification',
        mensagem: 'Disciplina alterada.'
      });

    },
    (response) => this.errorHandle.handle(response));
  }

  onMudarPagina(event: LazyLoadEvent) {
    const pagina = (event.first / event.rows);
    this.pesquisar(pagina);
  }

}
