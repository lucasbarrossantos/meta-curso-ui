import { DisciplinaCadastroComponent } from './disciplina-cadastro/disciplina-cadastro.component';
import { DisciplinaService } from './disciplina.service';
import { Disciplina } from '../shared/model/disciplina.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Routes, ActivatedRouteSnapshot, Resolve, RouterModule } from '@angular/router';
import { Injectable, NgModule } from '@angular/core';
import { DisciplinaPesquisaComponent } from './disciplina-pesquisa/disciplina-pesquisa.component';

@Injectable({ providedIn: 'root' })
export class DisciplinaResolve implements Resolve<Disciplina> {

    constructor(private service: DisciplinaService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Disciplina> {
        const id = route.params.codigo ? route.params.codigo : null;
        if (id) {
            return this.service.buscarPorCodigo(id).pipe(
                map((disciplina: HttpResponse<Disciplina>) => disciplina.body)
            );
        }
        return of(new Disciplina());
    }
}

export const routes: Routes = [
    {
        path: '',
        component: DisciplinaPesquisaComponent,
    },
    {
      path: 'nova',
      component: DisciplinaCadastroComponent,
      resolve: {
            disciplina: DisciplinaResolve
        }
    },
    {
      path: ':codigo',
      component: DisciplinaCadastroComponent,
      resolve: {
            disciplina: DisciplinaResolve
        }
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
  })
export class DisciplinaRoutingModule { }
