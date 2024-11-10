import { Component } from '@angular/core';

@Component({
  selector: 'app-tela-login-usuario',
  templateUrl: './tela-login-usuario.component.html',
  styleUrl: './tela-login-usuario.component.scss'
})
export class TelaLoginUsuarioComponent {
  username: string = '';
  password: string = '';

  onLogin() {
    console.log('Usuário:', this.username);
    console.log('Senha:', this.password);
  }
}
