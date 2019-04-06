import { CursoCadastroComponent } from './curso-cadastro/curso-cadastro.component';
import { CursoService } from './curso.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Routes, ActivatedRouteSnapshot, Resolve, RouterModule } from '@angular/router';
import { Injectable, NgModule } from '@angular/core';
import { Curso } from '../shared/model/curso.model';

@Injectable({ providedIn: 'root' })
export class CursoResolve implements Resolve<Curso> {

    constructor(private service: CursoService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Curso> {
        const id = route.params.codigo ? route.params.codigo : null;
        if (id) {
            return this.service.buscarPorCodigo(id).pipe(
                map((curso: HttpResponse<Curso>) => curso.body)
            );
        }
        return of(new Curso());
    }
}

export const routes: Routes = [
    {
        path: '',
        // component: CursoPesquisaComponent,
    },
    {
      path: 'novo',
      component: CursoCadastroComponent,
      resolve: {
            curso: CursoResolve
        }
    },
    {
      path: ':codigo',
      component: CursoCadastroComponent,
      resolve: {
            curso: CursoResolve
        }
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
  })
export class CursoRoutingModule { }
