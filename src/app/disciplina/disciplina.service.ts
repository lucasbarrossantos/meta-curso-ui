import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { DisciplinaFilter } from '../shared/model/filtros/disciplina.filter';
import { Disciplina } from '../shared/model/disciplina.model';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  public resourceUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<any> {
    return this.http.get<Disciplina[]>(`${this.resourceUrl}/disciplinas`, {
      params: null, observe: 'response',
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
     })
    });
  }

  pesquisar(filtro: DisciplinaFilter): Observable<any> {
    let param = new HttpParams();
    param = this.filtros(filtro, param);

    return this.http
      .get<Disciplina[]>(`${this.resourceUrl}/disciplinas?sort=nome,asc`, { params: param, observe: 'response' })
      .pipe(map((res: any) => this.convertDateArrayFromServer(res)));
  }

  excluir(codigo: number) {
    return this.http.delete<any>(`${this.resourceUrl}/disciplinas/${codigo}`,
    {
      observe: 'response'
    });
  }

  salvar(categoria: Disciplina): Observable<any> {
    return this.http.post<Disciplina>(`${this.resourceUrl}/disciplinas`, categoria , {
      params: null, observe: 'response' });
  }

  atualizar(categoria: Disciplina): Observable<any> {
    return this.http
        .put<Disciplina>(`${this.resourceUrl}/disciplinas/${categoria.codigo}`, categoria,
        { observe: 'response' });
  }

  buscarPorCodigo(id: number): Observable<any> {
    return this.http
      .get<Disciplina>(`${this.resourceUrl}/disciplinas/${id}`,
        {observe: 'response' }).pipe(map((res: any) => res));
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

  protected convertDateArrayFromServer(res: any): any {
    let resultado = {};
    if (res.body) {
      resultado = {
        disciplinas: res.body.content,
        total: res.body.totalElements
      };
    }
    return resultado;
  }
}
