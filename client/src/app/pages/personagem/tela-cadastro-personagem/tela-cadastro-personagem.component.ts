import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Personagem } from 'src/app/model/Personagem';
import { PersonagemService } from 'src/app/service/personagem.service';

@Component({
  selector: 'app-tela-cadastro-personagem',
  templateUrl: './tela-cadastro-personagem.component.html',
  styleUrl: './tela-cadastro-personagem.component.scss'
})
export class TelaCadastroPersonagemComponent implements OnInit {

  personagem: Personagem = new Personagem();

  constructor(
    public service: PersonagemService,
    public message: MessageService
  ) {}

  ngOnInit(): void {
    
  }

  async save() {
    if(!this.personagem?.nome) {
      this.message.add({
        severity: 'info',
        summary: "Aviso",
        detail: 'Informe o nome do personagem'
      })
      return;
    }

    this.service.savePromise(this.personagem).then((ret) => {
      this.message.add({
        severity: "success",
        summary: 'Sucesso',
        detail: 'Personagem salvo com sucesso!'
      });
      this.personagem = new Personagem();
    }).catch((err) => {
      console.error(err);
      this.message.add({
        severity: "erro",
        summary: 'Erro',
        detail: 'Ocorreu um erro ao salvar o personagem!'
      })
    })
  

  }
}
