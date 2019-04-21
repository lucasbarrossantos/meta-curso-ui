import { EventoService } from './../evento.service';
import { Evento } from '../../shared/model/evento.model';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandleService } from 'src/app/shared/core/error-handle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-evento-cadastro',
  templateUrl: './evento-cadastro.component.html',
  styleUrls: ['./evento-cadastro.component.css']
})
export class EventoCadastroComponent implements OnInit {

  evento = new Evento();
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
    private eventoService: EventoService,
    private toasty: ToastyService,
    private errorHandle: ErrorHandleService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Novo evento');
    this.route.data.subscribe(({ evento }) => {
      this.evento = evento;
    });
  }

  get editando() {
    return Boolean(this.evento.codigo);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarEvento(form);
    } else {
      this.adicionarEvento(form);
    }
  }

  adicionarEvento(form: FormControl) {
    this.eventoService.salvar(this.evento).subscribe(() => {
      this.toasty.success('Evento salvo com sucesso!');
      form.reset();
      this.evento = new Evento();
      this.router.navigate(['/eventos']);
    }, (error) => this.errorHandle.handle(error));
  }

  atualizarEvento(form: FormControl) {
    this.eventoService.atualizar(this.evento).subscribe(() => {
      this.toasty.success('Evento atualizado com sucesso!');
      form.reset();
      this.evento = new Evento();
      this.router.navigate(['/eventos']);
    }, (error) => this.errorHandle.handle(error.error[0].mensagemUsuario));
  }

}
