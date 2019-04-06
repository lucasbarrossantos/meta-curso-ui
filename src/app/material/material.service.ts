import { Material } from './../shared/model/material.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
