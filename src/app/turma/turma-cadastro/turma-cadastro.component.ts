import { map } from 'rxjs/operators';
import { Curso } from './../../shared/model/curso.model';
import { CursoService } from './../../curso/curso.service';
import { TurmaService } from './../turma.service';
import { Turma } from '../../shared/model/turma.model';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandleService } from 'src/app/shared/core/error-handle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-turma-cadastro',
  templateUrl: './turma-cadastro.component.html',
  styleUrls: ['./turma-cadastro.component.css']
})
export class TurmaCadastroComponent implements OnInit {

  turma = new Turma();
  cursos: Curso[];
  disciplinas: [];
  professores: [];
  ativo = [
    { label: 'Sim', value: 0 },
    { label: 'Não', value: 1 }
  ];
  pt = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  };

  constructor(
    private turmaService: TurmaService,
    private toasty: ToastyService,
    private cursoService: CursoService,
    private errorHandle: ErrorHandleService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Nova turma');
    this.route.data.subscribe(({ turma }) => {
      const codigo = turma.curso;
      this.turma = turma;
      this.turma.curso = new Curso();
      this.turma.curso.codigo = codigo;
      if (turma.codigo) {
        this.title.setTitle('Atualização de turma');
      }
    }, (error) => console.log('error => ', error));
    this.carregarCursos();
  }

  get editando() {
    return Boolean(this.turma.codigo);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarTurma(form);
    } else {
      this.adicionarTurma(form);
    }
  }

  adicionarTurma(form: FormControl) {
    this.turmaService.salvar(this.turma).subscribe(() => {
      this.toasty.success('Turma salva com sucesso!');
      this.router.navigate(['/turmas', this.turma.codigo]);
    }, (error) => this.errorHandle.handle(error));
  }

  atualizarTurma(form: FormControl) {
    this.turmaService.atualizar(this.turma).subscribe(() => {
      this.toasty.success('Turma atualizada com sucesso!');
      this.router.navigate(['/turmas', this.turma.codigo]);
    }, (error) => this.errorHandle.handle(error));
  }

  adicionarCurso(item: any) {
    if (item.viewModel) {
      this.turma.curso.codigo = item.viewModel.value;
    }
  }

  carregarCursos() {
    this.cursoService.listarTodos().subscribe((dados) => {
      this.cursos = dados.body.content.map(c => ({ label: c.nome, value: c.codigo }));
    });
  }
}
