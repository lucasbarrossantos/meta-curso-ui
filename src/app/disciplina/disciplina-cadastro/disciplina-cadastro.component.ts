import { DisciplinaService } from './../disciplina.service';
import { Disciplina } from '../../shared/model/disciplina.model';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandleService } from 'src/app/shared/core/error-handle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-disciplina-cadastro',
  templateUrl: './disciplina-cadastro.component.html',
  styleUrls: ['./disciplina-cadastro.component.css']
})
export class DisciplinaCadastroComponent implements OnInit {

  disciplina = new Disciplina();
  ativo = [
    { label: 'Sim', value: 0 },
    { label: 'Não', value: 1 }
  ];

  linguagens = [
    { label: 'Selecione', value: null },
    { label: 'Espanhol', value: 1 },
    { label: 'Inglês', value: '0' },
  ];

  constructor(
    private disciplinaService: DisciplinaService,
    private toasty: ToastyService,
    private errorHandle: ErrorHandleService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova disciplina');
    this.route.data.subscribe(({ disciplina }) => {
      this.disciplina = disciplina;
    });
  }

  get editando() {
    return Boolean(this.disciplina.codigo);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarDisciplina(form);
    } else {
      this.adicionarDisciplina(form);
    }
  }

  adicionarDisciplina(form: FormControl) {
    this.disciplinaService.salvar(this.disciplina).subscribe(() => {
      this.toasty.success('Disciplina salva com sucesso!');
      form.reset();
      this.disciplina = new Disciplina();
      this.router.navigate(['/disciplinas']);
    }, (error) => this.errorHandle.handle(error));
  }

  atualizarDisciplina(form: FormControl) {
    this.disciplinaService.atualizar(this.disciplina).subscribe(() => {
      this.toasty.success('Disciplina atualizada com sucesso!');
      form.reset();
      this.disciplina = new Disciplina();
      this.router.navigate(['/disciplinas']);
    }, (error) => this.errorHandle.handle(error));
  }

}
