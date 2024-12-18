import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUpload, UploadEvent } from 'primeng/fileupload';
import { Palavra } from 'src/app/model/Palavra';
import { PalavraService } from 'src/app/service/palavra.service';

@Component({
  selector: 'app-tela-cadastro-palavra',
  templateUrl: './tela-cadastro-palavra.component.html',
  styleUrl: './tela-cadastro-palavra.component.scss',
})
export class TelaCadastroPalavraComponent {

  @ViewChild('fileUpload')
  fileUpload!: FileUpload;

  @ViewChild('inputOtp', { static: true, read: ElementRef }) inputOtp!: ElementRef;


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

  doValidate(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.palavra?.descricao || this.palavra?.descricao.length <= 3) {
        this.message.add({
          severity: 'info',
          summary: "Aviso",
          detail: "A palavra deve ter mais que 3 letras!"
        })
        return reject();
      }
      if (!this.palavra?.imagem) {
        this.message.add({
          severity: 'info',
          summary: "Aviso",
          detail: "Por favor, selecione uma imagem!"
        })
        return reject();
      }
      return resolve();
    });
  }

  save() {
    this.doValidate().then(() => {
      this.service.save(this.palavra).subscribe({
        next: (value) => {
          this.message.add({
            severity: 'success',
            summary: "Sucesso",
            detail: "Sua palavra foi cadastrada!"
          });
          this.palavra = new Palavra();
          this.fileUpload.clear();
  
          const inputs = this.inputOtp.nativeElement.querySelectorAll('input');
          inputs.forEach((input: HTMLInputElement) => {
            input.value = '';
          });
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
    }).catch(() => {})
  }
}
