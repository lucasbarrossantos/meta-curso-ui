import { CategoriaService } from './../categoria.service';
import { CategoriaFilter } from './../../shared/model/filtros/categoria.filter';
import { Categoria } from './../../shared/categoria.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastyService } from 'ng2-toasty';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { Title } from '@angular/platform-browser';
import { ErrorHandleService } from 'src/app/shared/core/error-handle.service';
import { EventEmitterService } from 'src/app/shared/utils/event.manager';

@Component({
  selector: 'app-categoria-pesquisa',
  templateUrl: './categoria-pesquisa.component.html',
  styleUrls: ['./categoria-pesquisa.component.css']
})
export class CategoriaPesquisaComponent implements OnInit, OnDestroy {

  categorias: Categoria[];
  filtro = new CategoriaFilter();
  totalRegistros = 0; // Qtd de registro do retorno da consulta
  @ViewChild('tabela') grid; // @ViewChild('?') recupera algum dado da view
  sub: Subscription;

  constructor(
    private categoriaService: CategoriaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandle: ErrorHandleService,
    private title: Title
    ) {
      EventEmitterService.get('CategoriaListModification').subscribe((data) => {
        this.grid.first = 0;
        this.pesquisar();
      });
    }

  ngOnInit() {
    this.title.setTitle('Pesquisa de categoria');
    this.sub = EventEmitterService.get('CategoriaListModification').subscribe( data => {} );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.categoriaService.pesquisar( this.filtro ).subscribe((dados) => {
      this.totalRegistros = dados.total;
      this.categorias = dados.categorias;
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
    this.categoriaService.excluir(codigo).subscribe((response) => {

      this.toasty.success({
        title: 'Exclusão de Pessoa',
        msg: 'Pessoa excluída com sucesso!',
        showClose: true,
        timeout: 5000
      });

      EventEmitterService.get('PessoasListModification').emit({
        nome: 'PessoasListModification',
        mensagem: 'Pessoa alterada.'
      });

    },
    (response) => this.errorHandle.handle(response));
  }

  onMudarPagina(event: LazyLoadEvent) {
    const pagina = (event.first / event.rows);
    this.pesquisar(pagina);
  }

}
