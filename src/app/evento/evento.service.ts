import { EventoFilter } from './../shared/model/filtros/evento.filter';
import { Evento } from '../shared/model/evento.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  public resourceUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  pesquisar(filtro: EventoFilter): Observable<any> {
    let param = new HttpParams();
    param = this.filtros(filtro, param);

    return this.http
      .get<Evento[]>(`${this.resourceUrl}/eventos`, { params: param, observe: 'response' })
      .pipe(map((res: any) => this.convertDateArrayFromServer(res)));
  }

  excluir(codigo: number) {
    return this.http.delete<any>(`${this.resourceUrl}/eventos/${codigo}`,
    {
      observe: 'response'
    });
  }

  salvar(evento: Evento): Observable<any> {
    return this.http.post<Evento>(`${this.resourceUrl}/eventos`, evento , {
      params: null, observe: 'response' });
  }

  atualizar(evento: Evento): Observable<any> {
    return this.http
        .put<Evento>(`${this.resourceUrl}/eventos/${evento.codigo}`, evento,
        { observe: 'response' });
  }

  buscarPorCodigo(id: number): Observable<any> {
    return this.http
      .get<Evento>(`${this.resourceUrl}/eventos/${id}`,
        {observe: 'response' }).pipe(map((res: any) => this.convertDateFromServer(res)));
  }

  private filtros(filtro: any, param: HttpParams) {
    // Parametros de paginacao
    param = param.set('page', filtro.pagina);
    param = param.set('size', filtro.itensPorPagina);

    // Parametros de filtragens
    if (filtro.descricao) {
      param = param.set('descricao', filtro.descricao);
    }

    return param;
  }

  protected convertDateArrayFromServer(res: any): any {
    let resultado = {};
    if (res.body) {
      resultado = {
        eventos: res.body.content,
        total: res.body.totalElements
      };
    }
    return resultado;
  }

  protected convertDateFromServer(res: any): any {
    if (res.body) {
        res.body.dataInicio = res.body.dataInicio != null ?
          moment(res.body.dataInicio, 'YYYY-MM-DD').toDate() : null;
    }
    return res;
  }
}
