import { AlunoCadastroComponent } from './aluno-cadastro/aluno-cadastro.component';
import { AlunoService } from './aluno.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Routes, ActivatedRouteSnapshot, Resolve, RouterModule } from '@angular/router';
import { Injectable, NgModule } from '@angular/core';
import { Aluno } from '../shared/model/aluno.model';
import { AlunoPesquisaComponent } from './aluno-pesquisa/aluno-pesquisa.component';

@Injectable({ providedIn: 'root' })
export class AlunoResolve implements Resolve<Aluno> {
    aluno = new Aluno();
    constructor(private service: AlunoService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Aluno> {
        const id = route.params.codigo ? route.params.codigo : null;
        if (id) {
            return this.service.buscarPorCodigo(id).pipe(
                map((aluno: HttpResponse<Aluno>) => aluno.body)
            );
        }
        return of(new Aluno());
    }
}

export const routes: Routes = [
    {
        path: '',
        component: AlunoPesquisaComponent,
    },
    {
      path: 'novo',
      component: AlunoCadastroComponent,
      resolve: {
            aluno: AlunoResolve
        }
    },
    {
      path: ':codigo',
      component: AlunoCadastroComponent,
      resolve: {
            aluno: AlunoResolve
        }
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
  })
export class AlunoRoutingModule { }
