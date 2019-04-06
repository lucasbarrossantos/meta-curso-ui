import { CursoFilter } from './../shared/model/filtros/curso.filter';
import { Curso } from '../shared/model/curso.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  public resourceUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  pesquisar(filtro: CursoFilter): Observable<any> {
    let param = new HttpParams();
    param = this.filtros(filtro, param);

    return this.http
      .get<Curso[]>(`${this.resourceUrl}/cursos`, { params: param, observe: 'response' })
      .pipe(map((res: any) => this.convertDateArrayFromServer(res)));
  }

  excluir(codigo: number) {
    return this.http.delete<any>(`${this.resourceUrl}/cursos/${codigo}`,
    {
      observe: 'response'
    });
  }

  excluirDisciplina(cursoId: number, disciplinaId: number) {
    return this.http.delete<any>(`${this.resourceUrl}/cursos/${cursoId}/remover-disciplina/${disciplinaId}`,
    { observe: 'response' });
  }

  salvar(curso: Curso): Observable<any> {
    return this.http.post<Curso>(`${this.resourceUrl}/cursos`, curso , {
      params: null, observe: 'response' })
      .pipe(map((res: any) => res.body ));
  }

  adicionarDisciplina(cursoId: number, disciplinaId): Observable<any> {
    return this.http
    .post<Curso>(`${this.resourceUrl}/cursos/${cursoId}/adicionar-disciplina/${disciplinaId}`, null , {
      params: null, observe: 'response' }).pipe(map((res: any) => res.body ));
  }

  atualizar(curso: Curso): Observable<any> {
    return this.http
        .put<Curso>(`${this.resourceUrl}/cursos/${curso.codigo}`, curso,
        { observe: 'response' }).pipe(map((res: any) => res.body ));
  }

  buscarPorCodigo(id: number): Observable<any> {
    return this.http
      .get<Curso>(`${this.resourceUrl}/cursos/${id}`,
        {observe: 'response' }).pipe(map((res: any) => res));
  }

  disciplinasDoCurso(id: number): Observable<any> {
    return this.http
      .get<Curso>(`${this.resourceUrl}/cursos/disciplinas-do-curso/${id}`,
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
        cursos: res.body.content,
        total: res.body.totalElements
      };
    }
    return resultado;
  }

}
