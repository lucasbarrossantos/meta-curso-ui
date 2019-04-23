import { EmpresaCadastroComponent } from './empresa-cadastro/empresa-cadastro.component';
import { EmpresaService } from './empresa.service';
import { Empresa } from '../shared/model/empresa.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Routes, ActivatedRouteSnapshot, Resolve, RouterModule } from '@angular/router';
import { Injectable, NgModule } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EmpresaResolve implements Resolve<Empresa> {

    constructor(private service: EmpresaService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Empresa> {
        const id = route.params.codigo ? route.params.codigo : null;
        if (id) {
            return this.service.buscarPorCodigo(id).pipe(
                map((empresa: HttpResponse<Empresa>) => empresa.body)
            );
        }
        return of(new Empresa());
    }
}

export const routes: Routes = [
    /* {
        path: '',
        component: EmpresaPesquisaComponent,
    }, */
    {
      path: 'nova',
      component: EmpresaCadastroComponent,
      resolve: {
            empresa: EmpresaResolve
        }
    },
    {
      path: ':codigo',
      component: EmpresaCadastroComponent,
      resolve: {
            empresa: EmpresaResolve
        }
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
  })
export class EmpresaRoutingModule { }
