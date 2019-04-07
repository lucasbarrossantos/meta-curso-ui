import { Professor } from './../shared/model/professor.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  public resourceUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  salvar(professor: Professor): Observable<any> {
    return this.http.post<Professor>(`${this.resourceUrl}/pessoas`, professor , {
      params: null, observe: 'response' });
  }

  atualizar(professor: Professor): Observable<any> {
    return this.http
        .put<Professor>(`${this.resourceUrl}/pessoas/${professor.codigo}`, professor,
        { observe: 'response' });
  }

  buscarPorCodigo(id: number): Observable<any> {
    return this.http
      .get<Professor>(`${this.resourceUrl}/pessoas/${id}`,
        {observe: 'response' }).pipe(map((res: any) => this.convertDateFromServer(res)));
  }

  protected convertDateFromServer(res: any): any {
    if (res.body) {
        res.body.datanascimento = res.body.datanascimento != null ?
          moment(res.body.datanascimento, 'YYYY-MM-DD').toDate() : null;
    }
    return res;
  }

}
