import { EmpresaFilter } from './../shared/model/filtros/empresa.filter';
import { Empresa } from '../shared/model/empresa.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  public resourceUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  pesquisar(filtro: EmpresaFilter): Observable<any> {
    let param = new HttpParams();
    param = this.filtros(filtro, param);

    return this.http
      .get<Empresa[]>(`${this.resourceUrl}/empresas`, { params: param, observe: 'response' })
      .pipe(map((res: any) => this.convertDateArrayFromServer(res)));
  }

  excluir(codigo: number) {
    return this.http.delete<any>(`${this.resourceUrl}/empresas/${codigo}`,
    {
      observe: 'response'
    });
  }

  salvar(empresa: Empresa): Observable<any> {
    return this.http.post<Empresa>(`${this.resourceUrl}/empresas`, empresa , {
      params: null, observe: 'response' });
  }

  atualizar(empresa: Empresa): Observable<any> {
    return this.http
        .put<Empresa>(`${this.resourceUrl}/empresas/${empresa.codigo}`, empresa,
        { observe: 'response' });
  }

  buscarPorCodigo(id: number): Observable<any> {
    return this.http
      .get<Empresa>(`${this.resourceUrl}/empresas/${id}`,
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
        empresas: res.body.content,
        total: res.body.totalElements
      };
    }
    return resultado;
  }
}
