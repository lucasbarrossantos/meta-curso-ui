import { CategoriaService } from './../categoria.service';
import { Categoria } from '../../shared/model/categoria.model';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandleService } from 'src/app/shared/core/error-handle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-categoria-cadastro',
  templateUrl: './categoria-cadastro.component.html',
  styleUrls: ['./categoria-cadastro.component.css']
})
export class CategoriaCadastroComponent implements OnInit {

  categoria = new Categoria();

  constructor(
    private categoriaService: CategoriaService,
    private toasty: ToastyService,
    private errorHandle: ErrorHandleService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova categoria');
    this.route.data.subscribe(({ categoria }) => {
      this.categoria = categoria;
    });
  }

  get editando() {
    return Boolean(this.categoria.codigo);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarCategoria(form);
    } else {
      this.adicionarCategoria(form);
    }
  }

  adicionarCategoria(form: FormControl) {
    this.categoria.tipo = 0;
    this.categoriaService.salvar(this.categoria).subscribe(() => {
      this.toasty.success('Categoria salva com sucesso!');
      form.reset();
      this.categoria = new Categoria();
      this.router.navigate(['/categorias']);
    }, (error) => this.errorHandle.handle(error));
  }

  atualizarCategoria(form: FormControl) {
    this.categoriaService.atualizar(this.categoria).subscribe(() => {
      this.toasty.success('Categoria atualizada com sucesso!');
      form.reset();
      this.categoria = new Categoria();
      this.router.navigate(['/categorias']);
    }, (error) => this.errorHandle.handle(error));
  }

}
