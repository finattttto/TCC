import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/service/user-service';

@Component({
  selector: 'app-tela-login-usuario',
  templateUrl: './tela-login-usuario.component.html',
  styleUrl: './tela-login-usuario.component.scss'
})
export class TelaLoginUsuarioComponent {

  constructor(
    public userService: UserService,
    public msg: MessageService
  ) {}

  username: string = '';
  password: string = '';

  onLogin() {
    this.userService.login({username: this.username, password: this.password}).subscribe({
      next: (value) => {
        if (value?.token) {
          localStorage.setItem('auth', value.token);
        }
        this.msg.add({
          severity: 'success',
          detail: 'Login realizado com sucesso!',
        });
      },
      error: (err) => {
        this.msg.add({
          severity: 'info',
          detail: 'Não foi possivel realizar seu login!',
        });
      },
    })
  }
}
