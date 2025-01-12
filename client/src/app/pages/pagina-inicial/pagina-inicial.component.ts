import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Personagem } from 'src/app/model/Personagem';
import { PersonagemService } from 'src/app/service/personagem.service';
import { UtilService } from 'src/app/service/util.service';

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

  personagem: Personagem = new Personagem();
  personagens: Personagem[] = [];
  isMoving: boolean = false;

  private _etapa: ETelaInicial = ETelaInicial.PADRAO;

  get etapa(): ETelaInicial {
    return this._etapa;
  }

  set etapa(value: ETelaInicial) {
    this._etapa = value;
    this.onEtapaChange(value);
  }

  get personagemAtivo() {
    return UtilService.getPersonagem();
  }

  constructor(
    public personagemService: PersonagemService,
    public router: Router
  ) {}

  ngOnInit(): void {
    
  }

  private onEtapaChange(etapa: ETelaInicial): void {
    this.isMoving = true;
    setTimeout(() => {
      this.isMoving = false;
    }, 1000)
  }

  play() {
    this.router.navigateByUrl("/alfabeto-manual")
  }

  novoPersonagem() {
    this.etapa = ETelaInicial.NOVO_PERSONAGEM;
  }

  editarPersonagem() {
    this.etapa = ETelaInicial.NOVO_PERSONAGEM;
    this.personagem = this.personagemAtivo;
  }

  async savePersonagem(){
    if(this.personagem?.nome) {
      this.personagem = await this.personagemService.savePromise(this.personagem);
      UtilService.setPersonagem(this.personagem);
      this.personagem = new Personagem();
      this.etapa = ETelaInicial.PADRAO;
    }
  }

  async selecionarPersonagem() {
    this.personagens = await firstValueFrom(this.personagemService.getAllRequest());
    this.etapa = ETelaInicial.SELECAO_PERSONAGEM;
  }

  selectPersonagem(p: Personagem) {
    UtilService.setPersonagem(p);
    this.etapa = ETelaInicial.PADRAO;
  }
}

