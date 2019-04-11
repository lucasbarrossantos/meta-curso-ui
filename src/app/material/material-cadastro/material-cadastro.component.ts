import { MaterialService } from './../material.service';
import { Material } from '../../shared/model/material.model';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandleService } from 'src/app/shared/core/error-handle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-material-cadastro',
  templateUrl: './material-cadastro.component.html',
  styleUrls: ['./material-cadastro.component.css']
})
export class MaterialCadastroComponent implements OnInit {

  material = new Material();
  disponivel = [
    { label: 'Sim', value: true },
    { label: 'Não', value: false }
  ];

  constructor(
    private materialService: MaterialService,
    private toasty: ToastyService,
    private errorHandle: ErrorHandleService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Novo material');
    this.route.data.subscribe(({ material }) => {
      this.material = material;
    });
  }

  get editando() {
    return Boolean(this.material.codigo);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarMaterial(form);
    } else {
      this.adicionarMaterial(form);
    }
  }

  adicionarMaterial(form: FormControl) {
    this.materialService.salvar(this.material).subscribe(() => {
      this.toasty.success('Material salva com sucesso!');
      form.reset();
      this.material = new Material();
      this.router.navigate(['/materiais']);
    }, (error) => this.errorHandle.handle(error));
  }

  atualizarMaterial(form: FormControl) {
    this.materialService.atualizar(this.material).subscribe(() => {
      this.toasty.success('Material atualizado com sucesso!');
      form.reset();
      this.material = new Material();
      this.router.navigate(['/materiais']);
    }, (error) => this.errorHandle.handle(error));
  }

}
