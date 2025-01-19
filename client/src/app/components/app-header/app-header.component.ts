import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
})
export class AppHeaderComponent {
  items: MenuItem = [];

  get logged() {
    return UtilService.isLoggedIn();
  }

  constructor(public router: Router) {
    this.montaMenu();
  }

  montaMenu() {
    this.items = [
      {
        label: 'Início',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigateByUrl('');
        },
      },
      {
        separator: true
      },
      { 
        visible: this.logged,
        label: 'Admin page',
        icon: 'pi pi-user-plus',
        command: () => {
          this.router.navigateByUrl('/inicio-admin');
        },
      },
      {
        visible: this.logged,
        label: 'Sair',
        icon: 'pi pi-user-plus',
        command: () => {
          UtilService.loggout();
          this.router.navigateByUrl('/login');
        },
      },
      {
        visible: !this.logged,
        label: 'Entrar',
        icon: 'pi pi-sign-in',
        command: () => {
          this.router.navigateByUrl('/login');
        },
      },
      {
        visible: !this.logged,
        label: 'Cadastrar',
        icon: 'pi pi-user-plus',
        command: () => {
          this.router.navigateByUrl('/cadastro-user');
        },
      }
    ];
  }
}
