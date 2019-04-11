import { MaterialService } from './../material.service';
import { MaterialFilter } from './../../shared/model/filtros/material.filter';
import { Material } from '../../shared/model/material.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastyService } from 'ng2-toasty';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { Title } from '@angular/platform-browser';
import { ErrorHandleService } from 'src/app/shared/core/error-handle.service';
import { EventEmitterService } from 'src/app/shared/utils/event.manager';

@Component({
  selector: 'app-material-pesquisa',
  templateUrl: './material-pesquisa.component.html',
  styleUrls: ['./material-pesquisa.component.css']
})
export class MaterialPesquisaComponent implements OnInit, OnDestroy {

  materials: Material[];
  filtro = new MaterialFilter();
  totalRegistros = 0; // Qtd de registro do retorno da consulta
  @ViewChild('tabela') grid; // @ViewChild('?') recupera algum dado da view
  sub: Subscription;

  constructor(
    private materialService: MaterialService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandle: ErrorHandleService,
    private title: Title
    ) {
      EventEmitterService.get('MaterialListModification').subscribe((data) => {
        this.grid.first = 0;
        this.pesquisar();
      });
    }

  ngOnInit() {
    this.title.setTitle('Pesquisa de material');
    this.sub = EventEmitterService.get('MaterialListModification').subscribe( data => {} );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.materialService.pesquisar( this.filtro ).subscribe((dados) => {
      this.totalRegistros = dados.total;
      this.materials = dados.materiais.content;
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
    this.materialService.excluir(codigo).subscribe((response) => {

      this.toasty.success({
        title: 'Exclusão de Material',
        msg: 'Material excluída com sucesso!',
        showClose: true,
        timeout: 5000
      });

      EventEmitterService.get('MaterialListModification').emit({
        nome: 'MaterialListModification',
        mensagem: 'Material alterada.'
      });

    },
    (response) => this.errorHandle.handle(response));
  }

  onMudarPagina(event: LazyLoadEvent) {
    const pagina = (event.first / event.rows);
    this.pesquisar(pagina);
  }

}
