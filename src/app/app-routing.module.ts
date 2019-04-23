import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [

  // Categorias
  { path: 'categorias', loadChildren: './categoria/categoria.module#CategoriaModule' },

  // Cursos
  { path: 'cursos', loadChildren: './curso/curso.module#CursoModule' },

  // Professores
  { path: 'professores', loadChildren: './professor/professor.module#ProfessorModule' },

  // Alunos
  { path: 'alunos', loadChildren: './aluno/aluno.module#AlunoModule' },

  // Disciplinas
  { path: 'disciplinas', loadChildren: './disciplina/disciplina.module#DisciplinaModule' },

  // Materiais
  { path: 'materiais', loadChildren: './material/material.module#MaterialModule' },

  // Turmas
  { path: 'turmas', loadChildren: './turma/turma.module#TurmaModule' },

  // Eventos
  { path: 'eventos', loadChildren: './evento/evento.module#EventoModule' },

  // Empresas
  { path: 'empresas', loadChildren: './empresa/empresa.module#EmpresaModule' },

  /* // Alternativas
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' } */
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
