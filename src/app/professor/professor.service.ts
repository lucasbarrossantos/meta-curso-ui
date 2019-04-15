import { Professor } from './../shared/model/professor.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import * as moment from 'moment';
import { ProfessorFilter } from '../shared/model/filtros/professor.filter';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  public resourceUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<any> {
    return this.http.get<Professor[]>(`${this.resourceUrl}/pessoas`, {
      params: null, observe: 'response'
    }).pipe(map((res: any) => res ));
  }

  pesquisar(filtro: ProfessorFilter): Observable<any> {
    let param = new HttpParams();
    param = this.filtros(filtro, param);

    return this.http
      .get<Professor[]>(`${this.resourceUrl}/pessoas?sort=nome,asc`, { params: param, observe: 'response' })
      .pipe(map((res: any) => this.convertDateArrayFromServer(res)));
  }

  salvar(professor: Professor): Observable<any> {
    return this.http.post<Professor>(`${this.resourceUrl}/pessoas`, professor , {
      params: null, observe: 'response' });
  }

  atualizar(professor: Professor): Observable<any> {
    return this.http
        .put<Professor>(`${this.resourceUrl}/pessoas/${professor.codigo}`, professor,
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
      .get<Professor>(`${this.resourceUrl}/pessoas/${id}`,
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
        professores: res.body,
        total: res.body.totalElements
      };
    }
    return resultado;
  }

}
