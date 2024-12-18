import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Personagem } from 'src/app/model/Personagem';
import { PersonagemService } from 'src/app/service/personagem.service';

export enum ETelaInicial {
  PADRAO = 'PADRAO',
  NOVO_PERSONAGEM = 'NOVO_PERSONAGEM',
  SELECAO_PERSONAGEM = 'SELECAO_PERSONAGEM',
}

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.scss'
})
export class PaginaInicialComponent implements OnInit {

  etapa: ETelaInicial = ETelaInicial.PADRAO;
  personagem: Personagem = new Personagem();

  constructor(
    public personagemService: PersonagemService,
    public router: Router
  ) {}

  ngOnInit(): void {
    
  }

  play() {
    this.router.navigateByUrl("/adivinhacao")
  }

  savePersonagem(){

  }
}

