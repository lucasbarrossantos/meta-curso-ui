import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [

  // Categorias
  { path: 'categorias', loadChildren: '../app/categoria/categoria.module#CategoriaModule' },

  // Cursos
  { path: 'cursos', loadChildren: '../app/curso/curso.module#CursoModule' },

  /* // Alternativas
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' } */
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
