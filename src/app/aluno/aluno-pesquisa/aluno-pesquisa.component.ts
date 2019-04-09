import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastyService } from 'ng2-toasty';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { Title } from '@angular/platform-browser';
import { ErrorHandleService } from 'src/app/shared/core/error-handle.service';
import { EventEmitterService } from 'src/app/shared/utils/event.manager';
import { Aluno } from 'src/app/shared/model/aluno.model';
import { AlunoFilter } from 'src/app/shared/model/filtros/aluno.filter';
import { AlunoService } from '../aluno.service';

@Component({
  selector: 'app-aluno-pesquisa',
  templateUrl: './aluno-pesquisa.component.html',
  styleUrls: ['./aluno-pesquisa.component.css']
})
export class AlunoPesquisaComponent implements OnInit, OnDestroy {

  alunos: Aluno[];
  filtro = new AlunoFilter();
  totalRegistros = 0; // Qtd de registro do retorno da consulta
  @ViewChild('tabela') grid; // @ViewChild('?') recupera algum dado da view
  sub: Subscription;

  constructor(
    private alunoService: AlunoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandle: ErrorHandleService,
    private title: Title
    ) {
      EventEmitterService.get('AlunoListModification').subscribe((data) => {
        this.grid.first = 0;
        this.pesquisar();
      });
    }

  ngOnInit() {
    this.title.setTitle('Pesquisa de aluno');
    this.sub = EventEmitterService.get('AlunoListModification').subscribe( data => {} );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.alunoService.pesquisar( this.filtro ).subscribe((dados) => {
      console.log('dados', dados);
      this.totalRegistros = dados.total;
      this.alunos = dados.alunos.content;
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
    this.alunoService.excluir(codigo).subscribe((response) => {

      this.toasty.success({
        title: 'Exclusão de Aluno',
        msg: 'Aluno excluída com sucesso!',
        showClose: true,
        timeout: 5000
      });

      EventEmitterService.get('AlunoListModification').emit({
        nome: 'AlunoListModification',
        mensagem: 'Aluno alterada.'
      });

    },
    (response) => this.errorHandle.handle(response));
  }

  onMudarPagina(event: LazyLoadEvent) {
    const pagina = (event.first / event.rows);
    this.pesquisar(pagina);
  }

}
