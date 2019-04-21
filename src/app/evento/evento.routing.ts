import { EventoCadastroComponent } from './evento-cadastro/evento-cadastro.component';
import { EventoService } from './evento.service';
import { Evento } from '../shared/model/evento.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Routes, ActivatedRouteSnapshot, Resolve, RouterModule } from '@angular/router';
import { Injectable, NgModule } from '@angular/core';
import { EventoPesquisaComponent } from './evento-pesquisa/evento-pesquisa.component';

@Injectable({ providedIn: 'root' })
export class EventoResolve implements Resolve<Evento> {

    constructor(private service: EventoService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Evento> {
        const id = route.params.codigo ? route.params.codigo : null;
        if (id) {
            return this.service.buscarPorCodigo(id).pipe(
                map((evento: HttpResponse<Evento>) => evento.body)
            );
        }
        return of(new Evento());
    }
}

export const routes: Routes = [
    {
        path: '',
        component: EventoPesquisaComponent,
    },
    {
      path: 'novo',
      component: EventoCadastroComponent,
      resolve: {
            evento: EventoResolve
        }
    },
    {
      path: ':codigo',
      component: EventoCadastroComponent,
      resolve: {
            evento: EventoResolve
        }
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
  })
export class EventoRoutingModule { }
