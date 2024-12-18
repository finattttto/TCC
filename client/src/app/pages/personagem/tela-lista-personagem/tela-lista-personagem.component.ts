import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Personagem } from 'src/app/model/Personagem';
import { PersonagemService } from 'src/app/service/personagem.service';

@Component({
  selector: 'app-tela-lista-personagem',
  templateUrl: './tela-lista-personagem.component.html',
  styleUrl: './tela-lista-personagem.component.scss'
})
export class TelaListaPersonagemComponent implements OnInit {

  personagens: Personagem[] = [];

  constructor(
    public service: PersonagemService
  ){}

  async ngOnInit() {
    this.personagens = await firstValueFrom(this.service.getAllRequest());
  }
}
