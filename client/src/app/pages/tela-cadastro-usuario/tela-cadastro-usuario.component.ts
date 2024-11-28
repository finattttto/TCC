import { Component } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-tela-cadastro-usuario',
  templateUrl: './tela-cadastro-usuario.component.html',
  styleUrl: './tela-cadastro-usuario.component.scss',
})
export class TelaCadastroUsuarioComponent {
  user: Usuario = new Usuario();
  confirmPassword: string;

  constructor(public userService: UserService, public msg: MessageService) {}

  doValidate(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.user.password != this.confirmPassword) {
        return reject();
      }
      return resolve();
    });
  }

  onCadastro() {
    this.doValidate().then(() => {
      this.userService.cadastroRequest(this.user).subscribe({
        next: (value) => {
          if (value?.token) {
            localStorage.setItem('auth', value.token);
          }
          this.msg.add({
            severity: 'success',
            detail: 'Cadastro realizado com sucesso!',
          });
        },
        error: (err) => {
          console.log(err);
          this.msg.add({
            severity: 'error',
            detail: 'Ocorreu um erro ao cadastrar!',
          });
        },
      });
    });
  }
}
