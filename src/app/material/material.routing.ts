import { MaterialService } from './material.service';
import { Material } from '../shared/model/material.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Routes, ActivatedRouteSnapshot, Resolve, RouterModule } from '@angular/router';
import { Injectable, NgModule } from '@angular/core';
import { MaterialCadastroComponent } from './material-cadastro/material-cadastro.component';
import { MaterialPesquisaComponent } from './material-pesquisa/material-pesquisa.component';

@Injectable({ providedIn: 'root' })
export class MaterialResolve implements Resolve<Material> {

    constructor(private service: MaterialService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Material> {
        const id = route.params.codigo ? route.params.codigo : null;
        if (id) {
            return this.service.buscarPorCodigo(id).pipe(
                map((material: HttpResponse<Material>) => material.body)
            );
        }
        return of(new Material());
    }
}

export const routes: Routes = [
    {
        path: '',
        component: MaterialPesquisaComponent,
    },
    {
      path: 'novo',
      component: MaterialCadastroComponent,
      resolve: {
            material: MaterialResolve
        }
    },
    {
      path: ':codigo',
      component: MaterialCadastroComponent,
      resolve: {
            material: MaterialResolve
        }
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
  })
export class MaterialRoutingModule { }
