import { CategoriaCadastroComponent } from './categoria-cadastro/categoria-cadastro.component';
import { CategoriaService } from './categoria.service';
import { Categoria } from '../shared/model/categoria.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { CategoriaPesquisaComponent } from './categoria-pesquisa/categoria-pesquisa.component';
import { Routes, ActivatedRouteSnapshot, Resolve, RouterModule } from '@angular/router';
import { Injectable, NgModule } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategoriaResolve implements Resolve<Categoria> {

    constructor(private service: CategoriaService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Categoria> {
        const id = route.params.codigo ? route.params.codigo : null;
        if (id) {
            return this.service.buscarPorCodigo(id).pipe(
                map((categoria: HttpResponse<Categoria>) => categoria.body)
            );
        }
        return of(new Categoria());
    }
}

export const routes: Routes = [
    {
        path: '',
        component: CategoriaPesquisaComponent,
    },
    {
      path: 'nova',
      component: CategoriaCadastroComponent,
      resolve: {
            categoria: CategoriaResolve
        }
    },
    {
      path: ':codigo',
      component: CategoriaCadastroComponent,
      resolve: {
            categoria: CategoriaResolve
        }
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
  })
export class CategoriaRoutingModule { }
