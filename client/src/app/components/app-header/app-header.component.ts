import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
})
export class AppHeaderComponent {
  items: MenuItem = [];

  constructor(public router: Router) {
    this.items = [
      {
        label: 'Entrar',
        icon: 'pi pi-sign-in',
        command: () => {
          this.router.navigateByUrl('/login');
        },
      },
      {
        label: 'Cadastrar',
        icon: 'pi pi-user-plus',
        command: () => {
          this.router.navigateByUrl('/cadastro-user');
        },
      },
      {
        label: 'Nova imagem',
        icon: 'pi pi-user-plus',
        command: () => {
          this.router.navigateByUrl('/cadastro-palavra');
        },
      },
    ];
  }
}
