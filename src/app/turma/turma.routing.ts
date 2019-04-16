import { TurmaCadastroComponent } from './turma-cadastro/turma-cadastro.component';
import { TurmaService } from './turma.service';
import { Turma } from '../shared/model/turma.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Routes, ActivatedRouteSnapshot, Resolve, RouterModule } from '@angular/router';
import { Injectable, NgModule } from '@angular/core';
import { TurmaPesquisaComponent } from './turma-pesquisa/turma-pesquisa.component';

@Injectable({ providedIn: 'root' })
export class TurmaResolve implements Resolve<Turma> {

    constructor(private service: TurmaService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Turma> {
        const id = route.params.codigo ? route.params.codigo : null;
        if (id) {
            return this.service.buscarPorCodigo(id).pipe(
                map((turma: HttpResponse<Turma>) => turma.body)
            );
        }
        return of(new Turma());
    }
}

export const routes: Routes = [
    {
        path: '',
        component: TurmaPesquisaComponent,
    },
    {
      path: 'nova',
      component: TurmaCadastroComponent,
      resolve: {
            turma: TurmaResolve
        }
    },
    {
      path: ':codigo',
      component: TurmaCadastroComponent,
      resolve: {
            turma: TurmaResolve
        }
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
  })
export class TurmaRoutingModule { }
