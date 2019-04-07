import { MaterialService } from './../../material/material.service';
import { Material } from './../../shared/model/material.model';
import { DisciplinaService } from './../../disciplina/disciplina.service';
import { CursoService } from './../curso.service';
import { Curso } from '../../shared/model/curso.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandleService } from 'src/app/shared/core/error-handle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Disciplina } from 'src/app/shared/model/disciplina.model';
import { ConfirmationService } from 'primeng/components/common/api';
import { EventEmitterService } from 'src/app/shared/utils/event.manager';

@Component({
  selector: 'app-curso-cadastro',
  templateUrl: './curso-cadastro.component.html',
  styleUrls: ['./curso-cadastro.component.css']
})
export class CursoCadastroComponent implements OnInit, OnDestroy {

  @ViewChild('dd') combo;
  curso = new Curso();
  disciplinas: Disciplina[];
  materiais: Material[];
  private subDisc: any;
  private subMate: any;
  ativo = [
    { label: 'Sim', value: 0 },
    { label: 'Não', value: 1 }
  ];

  disciplinasCombo: Disciplina[];

  materiaisCombo: Material[];

  constructor(
    private cursoService: CursoService,
    private disciplinaService: DisciplinaService,
    private materialService: MaterialService,
    private toasty: ToastyService,
    private errorHandle: ErrorHandleService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {
    EventEmitterService.get('DisciplinaListModification').subscribe((data) => {
      this.buscarDisciplinasDoCurso(this.curso.codigo);
    });

    EventEmitterService.get('MaterialListModification').subscribe((data) => {
      this.buscarMateriaisDoCurso(this.curso.codigo);
    });
  }

  ngOnInit() {
    this.title.setTitle('Novo curso');

    // Combos
    this.disciplinaService.listarTodas().subscribe((dados) => {
      this.disciplinasCombo = dados.body.map(d => ({ label: d.nome, value: d.codigo }));
    });
    this.materialService.listarTodas().subscribe((dados) => {
      this.materiaisCombo = dados.body.map(m => ({ label: m.nome, value: m.codigo }));
    });
    // ...

    this.route.data.subscribe(({ curso }) => {
      console.log('curso >>> ', curso);
      this.curso = curso;

      if (curso.codigo) {
        this.buscarDisciplinasDoCurso(curso.codigo);
        this.buscarMateriaisDoCurso(curso.codigo);
      }
    });
    this.subDisc = EventEmitterService.get('DisciplinaListModification').subscribe( data => {} );
    this.subMate = EventEmitterService.get('MaterialListModification').subscribe( data => {} );
  }

  ngOnDestroy() {
    this.subDisc.unsubscribe();
    this.subMate.unsubscribe();
  }

  get editando() {
    return Boolean(this.curso.codigo);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarCurso(form);
    } else {
      this.adicionarCurso(form);
    }
  }

  adicionarCurso(form: FormControl) {
    this.cursoService.salvar(this.curso).subscribe(( curso ) => {
      this.toasty.success('Curso salvo com sucesso!');

      this.router.navigate(['/cursos', curso.codigo]);
    }, (error) => this.errorHandle.handle(error));
  }

  atualizarCurso(form: FormControl) {
    this.cursoService.atualizar(this.curso).subscribe(( curso ) => {
      this.toasty.success('Curso atualizado com sucesso!');
      this.router.navigate(['/cursos/', curso.codigo]);
    }, (error) => this.errorHandle.handle(error));
  }

  adicionarDisciplina(item: any) {
    if (item.viewModel) {
      this.cursoService.adicionarDisciplina(this.curso.codigo, item.viewModel.value)
      .subscribe((res) => {
          this.toasty.success({
            title: 'Disciplina adicionada com sucesso!',
            showClose: true,
            timeout: 5000
          });

          this.router.navigate(['/cursos', this.curso.codigo]);
          this.buscarDisciplinasDoCurso(this.curso.codigo);
        }, (error) => this.onError(error));
    }
  }

  adicionarMaterial(item: any) {
    if (item.viewModel) {
      this.cursoService.adicionarMaterial(this.curso.codigo, item.viewModel.value)
      .subscribe((res) => {
          this.toasty.success({
            title: 'Material adicionado com sucesso!',
            showClose: true,
            timeout: 5000
          });

          this.router.navigate(['/cursos', this.curso.codigo]);

          this.cursoService.buscarPorCodigo(this.curso.codigo).subscribe((data) => {
            this.curso = data.body;
          });

          this.buscarMateriaisDoCurso(this.curso.codigo);
        }, (error) => this.onError(error));
    }
  }

  buscarDisciplinasDoCurso(codigo: number) {
    this.cursoService.disciplinasDoCurso(codigo).subscribe( (res) => {
      this.disciplinas = res.body;
    });
  }

  buscarMateriaisDoCurso(codigo: number) {
    if (codigo) {
      this.cursoService.materiaisDoCurso(codigo).subscribe( (res) => {
        this.materiais = res.body;
      });
    }
  }

  excluirDisciplina(codigo: any) {
    this.cursoService.excluirDisciplina(this.curso.codigo, codigo).subscribe((response) => {

      this.toasty.success({
        title: 'Disciplina removida com sucesso!',
        showClose: true,
        timeout: 5000
      });

      EventEmitterService.get('DisciplinaListModification').emit({
        nome: 'DisciplinaListModification',
        mensagem: 'Disciplina alterada.'
      });
    },
    (response) => this.errorHandle.handle(response));
  }

  excluirMaterial(codigo: any) {
    this.cursoService.excluirMaterial(this.curso.codigo, codigo).subscribe((response) => {

      this.toasty.success({
        title: 'Material removido com sucesso!',
        showClose: true,
        timeout: 5000
      });

      EventEmitterService.get('MaterialListModification').emit({
        nome: 'MaterialListModification',
        mensagem: 'Disciplina alterada.'
      });

      this.cursoService.buscarPorCodigo(this.curso.codigo).subscribe((data) => {
        this.curso = data.body;
      });

    },
    (response) => this.errorHandle.handle(response));
  }

  confirmExclusaoDisciplina(codigo: number) {
    this.confirmation.confirm({
        message: 'Deseja realmente excluir?',
        header: 'Confirmação de exclusão',
        icon: 'pi pi-question-circle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
            this.excluirDisciplina(codigo);
        }
    });
  }

  confirmExclusaoMaterial(codigo: number) {
    this.confirmation.confirm({
        message: 'Deseja realmente excluir?',
        header: 'Confirmação de exclusão',
        icon: 'pi pi-question-circle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
            this.excluirMaterial(codigo);
        }
    });
  }

  protected onError(errorMessage: any) {
    this.toasty.error(errorMessage.error[0].mensagemUsuario);
  }

}
