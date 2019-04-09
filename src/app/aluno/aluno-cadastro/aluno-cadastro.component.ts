import { Aluno } from './../../shared/model/aluno.model';
import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../aluno.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandleService } from 'src/app/shared/core/error-handle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-aluno-cadastro',
  templateUrl: './aluno-cadastro.component.html',
  styleUrls: ['./aluno-cadastro.component.css']
})
export class AlunoCadastroComponent implements OnInit {
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
  aluno = new Aluno();
  generos = [
    { label: 'Selecione', value: null },
    { label: 'Masculino', value: '0' },
    { label: 'Feminino', value: 1 },
  ];

  ufs = [
    { label: 'Selecione', value: null },
    { label: 'PE', value: 'PE' },
    { label: 'BA', value: 'BA' },
  ];

  constructor(
    private alunoService: AlunoService,
    private toasty: ToastyService,
    private errorHandle: ErrorHandleService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Novo aluno');
    this.route.data.subscribe(({ aluno }) => {
      this.aluno = aluno;

      if (aluno.codigo) {
        this.title.setTitle('Atualização de aluno');
      }
    });
  }

  get editando() {
    return Boolean(this.aluno.codigo);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarAluno(form);
    } else {
      this.adicionarAluno(form);
    }
  }

  adicionarAluno(form: FormControl) {
    this.aluno.tipo = 1;
    this.alunoService.salvar(this.aluno).subscribe(() => {
      this.toasty.success('Aluno salvo com sucesso!');
      form.reset();
      this.aluno = new Aluno();
      this.router.navigate(['/alunos']);
    }, (error) => this.errorHandle.handle(error.error[0].mensagemUsuario));
  }

  atualizarAluno(form: FormControl) {
    this.aluno.tipo = 1;
    this.alunoService.atualizar(this.aluno).subscribe(() => {
      this.toasty.success('Aluno atualizado com sucesso!');
      /* form.reset();
      this.aluno = new Aluno(); */
      this.router.navigate(['/alunos']);
    }, (error) => this.errorHandle.handle(error.error[0].mensagemUsuario));
  }

}
