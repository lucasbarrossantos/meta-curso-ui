import { Disciplina } from 'src/app/shared/model/disciplina.model';
import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

}
