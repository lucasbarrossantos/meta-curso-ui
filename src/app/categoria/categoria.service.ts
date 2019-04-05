import { CategoriaFilter } from './../shared/model/filtros/categoria.filter';
import { Categoria } from './../shared/categoria.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public resourceUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

    pesquisar(filtro: CategoriaFilter): Observable<any> {
        let param = new HttpParams();
        param = this.filtros(filtro, param);

          return this.http.get<Categoria[]>(`${this.resourceUrl}/categorias`, {
            params: param, observe: 'response',
            headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
        })
      }).pipe(map((res: any) => this.convertDateArrayFromServer(res)));
    }

    excluir(codigo: any): any {
      
    }

    buscarPorCodigo(id: any): any {

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
