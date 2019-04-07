import { Professor } from './../../shared/model/professor.model';
import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../professor.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandleService } from 'src/app/shared/core/error-handle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-professor-cadastro',
  templateUrl: './professor-cadastro.component.html',
  styleUrls: ['./professor-cadastro.component.css']
})
export class ProfessorCadastroComponent implements OnInit {
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
  professor = new Professor();
  estadoCivil = [
    { label: 'Selecione', value: null },
    { label: 'Solteiro', value: '0' },
    { label: 'Casado', value: 1 },
    { label: 'Separado', value: 2 },
    { label: 'Divorciado', value: 3 },
    { label: 'Viúvo', value: 4 },
  ];

  ufs = [
    { label: 'Selecione', value: null },
    { label: 'PE', value: 'PE' },
    { label: 'BA', value: 'BA' },
  ];

  constructor(
    private professorService: ProfessorService,
    private toasty: ToastyService,
    private errorHandle: ErrorHandleService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Novo professor');
    this.route.data.subscribe(({ professor }) => {
      this.professor = professor;

      if (professor.codigo) {
        this.title.setTitle('Atualização de professor');
      }
    });
  }

  get editando() {
    return Boolean(this.professor.codigo);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarProfessor(form);
    } else {
      this.adicionarProfessor(form);
    }
  }

  adicionarProfessor(form: FormControl) {
    this.professor.tipo = 0;
    this.professorService.salvar(this.professor).subscribe(() => {
      this.toasty.success('Professor salva com sucesso!');
      form.reset();
      this.professor = new Professor();
      this.router.navigate(['/professores']);
    }, (error) => this.errorHandle.handle(error.error[0].mensagemUsuario));
  }

  atualizarProfessor(form: FormControl) {
    this.professor.tipo = 0;
    this.professorService.atualizar(this.professor).subscribe(() => {
      this.toasty.success('Professor atualizado com sucesso!');
      /* form.reset();
      this.professor = new Professor(); */
      this.router.navigate(['/professores']);
    }, (error) => this.errorHandle.handle(error.error[0].mensagemUsuario));
  }

}
