import { CategoriaService } from './../../categoria/categoria.service';
import { Categoria } from './../../shared/model/categoria.model';
import { EmpresaService } from './../empresa.service';
import { Empresa } from '../../shared/model/empresa.model';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandleService } from 'src/app/shared/core/error-handle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-empresa-cadastro',
  templateUrl: './empresa-cadastro.component.html',
  styleUrls: ['./empresa-cadastro.component.css']
})
export class EmpresaCadastroComponent implements OnInit {

  empresa = new Empresa();
  categorias: Categoria[];
  ufs = [
    { label: 'Selecione', value: null },
    { label: 'PE', value: 'PE' },
    { label: 'BA', value: 'BA' },
  ];

  constructor(
    private empresaService: EmpresaService,
    private categoriaService: CategoriaService,
    private toasty: ToastyService,
    private errorHandle: ErrorHandleService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova empresa');
    this.route.data.subscribe(({ empresa }) => {
      this.empresa = empresa;
    });
    this.carregarCategorias();
  }

  get editando() {
    return Boolean(this.empresa.codigo);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarEmpresa(form);
    } else {
      this.adicionarEmpresa(form);
    }
  }

  adicionarEmpresa(form: FormControl) {
    this.empresaService.salvar(this.empresa).subscribe(() => {
      this.toasty.success('Empresa salva com sucesso!');
      form.reset();
      this.empresa = new Empresa();
      this.router.navigate(['/empresas']);
    }, (error) => this.errorHandle.handle(error.error[0].mensagemUsuario));
  }

  atualizarEmpresa(form: FormControl) {
    this.empresaService.atualizar(this.empresa).subscribe(() => {
      this.toasty.success('Empresa atualizada com sucesso!');
      form.reset();
      this.empresa = new Empresa();
      this.router.navigate(['/empresas']);
    }, (error) => this.errorHandle.handle(error));
  }

  carregarCategorias() {
    this.categoriaService.listarTodas().subscribe((dados) => {
      this.categorias = dados.body.content.map( c => ({label: c.nome, value: c.codigo}) );
    });
  }

}
