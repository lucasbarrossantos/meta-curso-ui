import { Aluno } from './../shared/model/aluno.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import * as moment from 'moment';
import { AlunoFilter } from '../shared/model/filtros/aluno.filter';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  public resourceUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  pesquisar(filtro: AlunoFilter): Observable<any> {
    let param = new HttpParams();
    param = this.filtros(filtro, param);

    return this.http
      .get<Aluno[]>(`${this.resourceUrl}/pessoas?sort=nome,asc`, { params: param, observe: 'response' })
      .pipe(map((res: any) => this.convertDateArrayFromServer(res)));
  }

  salvar(aluno: Aluno): Observable<any> {
    return this.http.post<Aluno>(`${this.resourceUrl}/pessoas`, aluno , {
      params: null, observe: 'response' });
  }

  atualizar(aluno: Aluno): Observable<any> {
    return this.http
        .put<Aluno>(`${this.resourceUrl}/pessoas/${aluno.codigo}`, aluno,
        { observe: 'response' });
  }

  excluir(codigo: number) {
    return this.http.delete<any>(`${this.resourceUrl}/pessoas/${codigo}`,
    {
      observe: 'response'
    });
  }

  buscarPorCodigo(id: number): Observable<any> {
    return this.http
      .get<Aluno>(`${this.resourceUrl}/pessoas/${id}`,
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

    return param;
  }

  protected convertDateFromServer(res: any): any {
    if (res.body) {
        res.body.datanascimento = res.body.datanascimento != null ?
          moment(res.body.datanascimento, 'YYYY-MM-DD').toDate() : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: HttpResponse<any>): any {
    let resultado = {};
    if (res.body) {
      resultado = {
        alunos: res.body,
        total: res.body.totalElements
      };
    }
    return resultado;
  }

}
