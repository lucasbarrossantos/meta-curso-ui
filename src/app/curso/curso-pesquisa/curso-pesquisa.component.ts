import { CursoFilter } from './../../shared/model/filtros/curso.filter';
import { Curso } from './../../shared/model/curso.model';
import { CursoService } from './../curso.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ErrorHandleService } from 'src/app/shared/core/error-handle.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-curso-pesquisa',
  templateUrl: './curso-pesquisa.component.html',
  styleUrls: ['./curso-pesquisa.component.css']
})
export class CursoPesquisaComponent implements OnInit {

  cursos: Curso[];
  filtro = new CursoFilter();
  totalRegistros = 0; // Qtd de registro do retorno da consulta
  @ViewChild('tabela') grid; // @ViewChild('?') recupera algum dado da view
  ativo = [
    { label: 'Todos', value: null },
    { label: 'Sim', value: '0' },
    { label: 'Não', value: 1 }
  ];

  constructor(
    private cursoService: CursoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandle: ErrorHandleService,
    private title: Title
    ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de cursos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.cursoService.pesquisar( this.filtro )
      .subscribe(dados => {
        this.totalRegistros = dados.total;
        this.cursos = dados.cursos;
      }, (error) => this.errorHandle.handle(error));
  }

  onMudarPagina(event: LazyLoadEvent) {
    const pagina = (event.first / event.rows);
    this.pesquisar(pagina);
  }

  confirmExclusao(codigo: number) {
    this.confirmation.confirm({
        message: 'Deseja realmente excluir?',
        header: 'Confirmação de exclusão',
        icon: 'pi pi-question-circle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
            // this.excluir(codigo);
        }
    });
  }

}
