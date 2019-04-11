import { MaterialFilter } from './../shared/model/filtros/material.filter';
import { Material } from '../shared/model/material.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  public resourceUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<any> {
    return this.http.get<Material[]>(`${this.resourceUrl}/materiais`, {
      params: null, observe: 'response',
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
     })
    });
  }

  pesquisar(filtro: MaterialFilter): Observable<any> {
    let param = new HttpParams();
    param = this.filtros(filtro, param);

    return this.http
      .get<Material[]>(`${this.resourceUrl}/materiais`, { params: param, observe: 'response' })
      .pipe(map((res: any) => this.convertDateArrayFromServer(res)));
  }

  excluir(codigo: number) {
    return this.http.delete<any>(`${this.resourceUrl}/materiais/${codigo}`,
    {
      observe: 'response'
    });
  }

  salvar(material: Material): Observable<any> {
    return this.http.post<Material>(`${this.resourceUrl}/materiais`, material , {
      params: null, observe: 'response' });
  }

  atualizar(material: Material): Observable<any> {
    return this.http
        .put<Material>(`${this.resourceUrl}/materiais/${material.codigo}`, material,
        { observe: 'response' });
  }

  buscarPorCodigo(id: number): Observable<any> {
    return this.http
      .get<Material>(`${this.resourceUrl}/materiais/${id}`,
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
        materiais: res.body,
        total: res.body.totalElements
      };
    }
    return resultado;
  }
}
