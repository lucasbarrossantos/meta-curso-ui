import { Horario } from './../shared/model/horario.model';
import { Turma } from './../shared/model/turma.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import * as moment from 'moment';
import { TurmaFilter } from '../shared/model/filtros/turma.filter';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  public resourceUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  pesquisar(filtro: TurmaFilter): Observable<any> {
    let param = new HttpParams();
    param = this.filtros(filtro, param);

    return this.http
      .get<Turma[]>(`${this.resourceUrl}/turmas?resumo&sort=nome,asc`, { params: param, observe: 'response' })
      .pipe(map((res: any) => this.convertDateArrayFromServer(res)));
  }

  horariosDaTurma(turmaId: number): Observable<any> {
    return this.http
      .get<Horario>(`${this.resourceUrl}/turmas/horarios-da-turma/${turmaId}`,
        {observe: 'response' }).pipe(map((res: any) => res));
  }

  salvar(turma: Turma): Observable<any> {
    return this.http.post<Turma>(`${this.resourceUrl}/turmas`, turma , {
      params: null, observe: 'response' });
  }

  adicionarHorario(horario: Horario): Observable<any> {
    return this.http.post<Horario>(`${this.resourceUrl}/turmas/adicionar-horario`, horario , {
      params: null, observe: 'response' }).pipe(map((res: any) => res ));
  }

  atualizar(turma: Turma): Observable<any> {
    return this.http
        .put<Turma>(`${this.resourceUrl}/turmas/${turma.codigo}`, turma,
        { observe: 'response' });
  }

  excluir(codigo: number) {
    return this.http.delete<any>(`${this.resourceUrl}/turmas/${codigo}`,
    {
      observe: 'response'
    });
  }

  excluirDisciplina(turmaId: number, horarioId: number) {
    return this.http.delete<any>(`${this.resourceUrl}/turmas/${turmaId}/remover-horario/${horarioId}`,
    { observe: 'response' });
  }

  buscarPorCodigo(id: number): Observable<any> {
    return this.http
      .get<Turma>(`${this.resourceUrl}/turmas/${id}`,
        {observe: 'response' }).pipe(map((res: any) => this.convertDateFromServer(res)));
  }

  private filtros(filtro: any, param: HttpParams) {
    // Parametros de paginacao
    param = param.set('page', filtro.pagina);
    param = param.set('size', filtro.itensPorPagina);

    // Parametros de filtragens
    if (filtro.nome) {
      param = param.set('nome', filtro.nome);
    }

    if (filtro.nomeCurso) {
      param = param.set('nomeCurso', filtro.nomeCurso);
    }

    if (filtro.status) {
      param = param.set('status', filtro.status);
    }

    if (filtro.inicioDe) {
      param = param.set('inicioDe', filtro.inicioDe);
    }

    if (filtro.inicioAte) {
      param = param.set('inicioAte', filtro.inicioAte);
    }

    if (filtro.terminoDe) {
      param = param.set('terminoDe', filtro.terminoDe);
    }

    if (filtro.terminoAte) {
      param = param.set('terminoAte', filtro.terminoAte);
    }

    return param;
  }

  protected convertDateFromServer(res: any): any {
    if (res.body) {

      if (res.body.datainicio) {
        res.body.datainicio = res.body.datainicio != null ?
          moment(res.body.datainicio, 'YYYY-MM-DD').toDate() : null;
      }

      if (res.body.datatermino) {
        res.body.datatermino = res.body.datatermino != null ?
          moment(res.body.datatermino, 'YYYY-MM-DD').toDate() : null;
      }
    }
    return res;
  }

  protected convertDateArrayFromServer(res: HttpResponse<any>): any {
    let resultado = {};
    if (res.body) {
      resultado = {
        turmas: res.body,
        total: res.body.totalElements
      };
    }
    return resultado;
  }

}
