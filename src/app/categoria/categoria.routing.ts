import { CategoriaService } from './categoria.service';
import { Categoria } from './../shared/categoria.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { CategoriaPesquisaComponent } from './categoria-pesquisa/categoria-pesquisa.component';
import { Routes, ActivatedRouteSnapshot, Resolve, RouterModule } from '@angular/router';
import { Injectable, NgModule } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PessoaResolve implements Resolve<Categoria> {

    constructor(private service: CategoriaService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Categoria> {
        const id = route.params.codigo ? route.params.codigo : null;
        if (id) {
            return this.service.buscarPorCodigo(id).pipe(
                map((pessoa: HttpResponse<Categoria>) => pessoa.body)
            );
        }
        return of(new Categoria());
    }
}

export const routes: Routes = [
    { path: '', component: CategoriaPesquisaComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
  })
export class CategoriaRoutingModule { }
