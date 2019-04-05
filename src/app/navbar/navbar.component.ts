import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[];

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'Início',
        items: [
          { label: 'Interessados' },
          { label: 'Interessados(Eventos)' },
          { label: 'Matrículas' },
          { label: 'Frequências' },
          { label: 'Alunos' },
        ]
      },
      {
        label: 'Financeiro',
        items: [
          { label: 'Títulos'},
          { label: 'Estoque'},
          { label: 'Categoria', routerLink: '/categorias'}
        ]
      },
      {
        label: 'Relatórios',
        items: [
          { label: 'Matrículas' },
          { label: 'Financeiro' },
          { label: 'Frequências' },
          { label: 'Interessados' },
          { label: 'Professores' },
        ]
      },
      {
        label: 'Administração',
        items: [
          { label: 'Grupo de acesso' },
          { label: 'Papeis' },
          { label: 'Utilizadores' }
        ]
      },
      {
        label: 'Ajuda',
        items: [
          { label: 'Abrir chamado' },
          { label: 'Configurações' },
          { label: 'Sobre' },
          { label: 'Suporte', url: 'http://google.com' }
        ]
      },
      { label: 'Login',  routerLink: '/login' }
    ];
  }

}
