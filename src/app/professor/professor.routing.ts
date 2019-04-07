import { ProfessorCadastroComponent } from './professor-cadastro/professor-cadastro.component';
import { ProfessorService } from './professor.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Routes, ActivatedRouteSnapshot, Resolve, RouterModule } from '@angular/router';
import { Injectable, NgModule } from '@angular/core';
import { Professor } from '../shared/model/professor.model';
import { ProfessorPesquisaComponent } from './professor-pesquisa/professor-pesquisa.component';

@Injectable({ providedIn: 'root' })
export class ProfessorResolve implements Resolve<Professor> {
    professor = new Professor();
    constructor(private service: ProfessorService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Professor> {
        const id = route.params.codigo ? route.params.codigo : null;
        if (id) {
            return this.service.buscarPorCodigo(id).pipe(
                map((professor: HttpResponse<Professor>) => professor.body)
            );
        }
        return of(new Professor());
    }
}

export const routes: Routes = [
    {
        path: '',
        component: ProfessorPesquisaComponent,
    },
    {
      path: 'novo',
      component: ProfessorCadastroComponent,
      resolve: {
            professor: ProfessorResolve
        }
    },
    {
      path: ':codigo',
      component: ProfessorCadastroComponent,
      resolve: {
            professor: ProfessorResolve
        }
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
  })
export class ProfessorRoutingModule { }
