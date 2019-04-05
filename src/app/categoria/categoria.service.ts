import { CategoriaFilter } from './../shared/model/filtros/categoria.filter';
import { Categoria } from '../shared/model/categoria.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  public resourceUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  pesquisar(filtro: CategoriaFilter): Observable<any> {
    let param = new HttpParams();
    param = this.filtros(filtro, param);

    return this.http
      .get<Categoria[]>(`${this.resourceUrl}/categorias`, { params: param, observe: 'response' })
      .pipe(map((res: any) => this.convertDateArrayFromServer(res)));
  }

  excluir(codigo: number) {
    return this.http.delete<any>(`${this.resourceUrl}/categorias/${codigo}`,
    {
      observe: 'response'
    });
  }

  salvar(categoria: Categoria): Observable<any> {
    return this.http.post<Categoria>(`${this.resourceUrl}/categorias`, categoria , {
      params: null, observe: 'response' });
  }

  atualizar(categoria: Categoria): Observable<any> {
    return this.http
        .put<Categoria>(`${this.resourceUrl}/categorias/${categoria.codigo}`, categoria,
        { observe: 'response' });
  }

  buscarPorCodigo(id: number): Observable<any> {
    return this.http
      .get<Categoria>(`${this.resourceUrl}/categorias/${id}`,
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
        categorias: res.body.content,
        total: res.body.totalElements
      };
    }
    return resultado;
  }
}
