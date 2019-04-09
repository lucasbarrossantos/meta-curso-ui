import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [

  // Categorias
  { path: 'categorias', loadChildren: '../app/categoria/categoria.module#CategoriaModule' },

  // Cursos
  { path: 'cursos', loadChildren: '../app/curso/curso.module#CursoModule' },

  // Professores
  { path: 'professores', loadChildren: '../app/professor/professor.module#ProfessorModule' },

  // Alunos
  { path: 'alunos', loadChildren: '../app/aluno/aluno.module#AlunoModule' },

  /* // Alternativas
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' } */
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
