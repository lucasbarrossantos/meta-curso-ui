import { map } from 'rxjs/operators';
import { Horario } from './../../shared/model/horario.model';
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
import { DisciplinaService } from 'src/app/disciplina/disciplina.service';
import { ProfessorService } from 'src/app/professor/professor.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { EventEmitterService } from 'src/app/shared/utils/event.manager';

@Component({
  selector: 'app-turma-cadastro',
  templateUrl: './turma-cadastro.component.html',
  styleUrls: ['./turma-cadastro.component.css']
})
export class TurmaCadastroComponent implements OnInit {

  turma = new Turma();
  horario = new Horario();
  cursos: Curso[];
  disciplinas: [];
  professores: [];
  horarios: Horario[];
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
    private disciplinaService: DisciplinaService,
    private professorService: ProfessorService,
    private cursoService: CursoService,
    private errorHandle: ErrorHandleService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmation: ConfirmationService,
    private title: Title) {
      EventEmitterService.get('HorarioListModification').subscribe((data) => {
        this.caregarHorarios(this.turma.codigo);
      });
    }

  ngOnInit() {
    this.title.setTitle('Nova turma');
    this.carregarCursos();
    this.load();
  }

  load() {
    this.route.data.subscribe(({ turma }) => {
      const codigo = turma.curso;
      this.turma = turma;
      this.turma.curso = new Curso();
      this.turma.curso.codigo = codigo;
      if (turma.codigo) {
        this.title.setTitle('Atualização de turma');
      }
    }, (error) => console.log('error => ', error));
    this.carregarDisciplinas();
    this.carregarProfessores();

    if (this.turma.codigo) {
      this.caregarHorarios(this.turma.codigo);
    }
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
    this.turmaService.salvar(this.turma).subscribe(( turma ) => {
      this.toasty.success('Turma salva com sucesso!');
      this.router.navigate(['/turmas', turma.body.codigo]);
    }, (error) => this.errorHandle.handle(error));
  }

  atualizarTurma(form: FormControl) {
    this.turmaService.atualizar(this.turma).subscribe(( turma ) => {
      this.toasty.success('Turma atualizada com sucesso!');
      this.router.navigate(['/turmas', turma.body.codigo]);
    }, (error) => this.errorHandle.handle(error));
  }

  adicionarCurso(item: any) {
    if (item.viewModel) {
      this.turma.curso.codigo = item.viewModel.value;
    }
  }

  carregarCursos() {
    this.cursoService.listarTodos().subscribe((dados) => {
      this.cursos = dados.body.map(c => ({ label: c.nome, value: c.codigo }));
    });
  }

  carregarDisciplinas() {
    this.disciplinaService.listarTodas().subscribe((dados) => {
      this.disciplinas = dados.body.content.map(d => ({ label: d.nome, value: d.codigo }));
    });
  }

  carregarProfessores() {
    this.professorService.listarTodos().subscribe((dados) => {
      this.professores = dados.body.content.map(p => ({ label: p.nome, value: p.codigo }));
    });
  }

  adicionarHorario(horario: Horario, form: FormControl) {
    const turmaId = this.turma.codigo;
    horario.turma = new Turma();
    horario.turma.codigo = turmaId;
    this.turmaService.adicionarHorario(horario).subscribe((dados) => {
      this.horario = new Horario();
      form.reset();
      this.caregarHorarios(turmaId);
    }, (error) => this.errorHandle.handle(error.error[0].mensagemUsuario));
  }

  caregarHorarios(turmaId: number) {
    this.turmaService.horariosDaTurma(turmaId).subscribe((dados) => {
      this.horarios = dados.body;
    });
  }

  limparFormHorario(form: FormControl) {
    this.horario = new Horario();
    form.reset();
  }

  confirmExclusaoHorario(codigo: number) {
    this.confirmation.confirm({
        message: 'Deseja realmente excluir?',
        header: 'Confirmação de exclusão',
        icon: 'pi pi-question-circle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
            this.excluirHorario(codigo);
        }
    });
  }

  excluirHorario(codigo: any) {
    this.turmaService.excluirDisciplina(this.turma.codigo, codigo).subscribe((response) => {

      this.toasty.success('Horário removido com sucesso!');

      EventEmitterService.get('HorarioListModification').emit({
        nome: 'HorarioListModification'
      });
    },
    (response) => this.errorHandle.handle(response));
  }
}
