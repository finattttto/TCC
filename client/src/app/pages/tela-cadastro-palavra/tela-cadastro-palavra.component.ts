import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';
import { Palavra } from 'src/app/model/Palavra';
import { PalavraService } from 'src/app/service/palavra.service';

@Component({
  selector: 'app-tela-cadastro-palavra',
  templateUrl: './tela-cadastro-palavra.component.html',
  styleUrl: './tela-cadastro-palavra.component.scss',
})
export class TelaCadastroPalavraComponent {
  palavra: Palavra = new Palavra();

  constructor(
    public service: PalavraService,
    public message: MessageService
  ) {}

  onUpload(event: any): void {
    const file = event.files[0];
    if (file) {      
      const reader = new FileReader();
      reader.onload = () => {
        this.palavra.imagem = reader.result as string;    
      };

      reader.onerror = (error) => {
        console.error('Erro ao ler o arquivo:', error);
      };

      reader.readAsDataURL(file);
    }
  }

  save() {
    this.service.save(this.palavra).subscribe({
      next: (value) => {
        this.message.add({
          severity: 'success',
          summary: "Sucesso",
          detail: "Sua palavra foi cadastrada!"
        })
      },
      error: (err) => {
        console.log(err);
        this.message.add({
          severity: 'error',
          summary: "Erro",
          detail: "Ocorreu um erro ao salvar"
        })
      },
    })
  }
}
