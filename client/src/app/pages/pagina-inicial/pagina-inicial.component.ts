import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { firstValueFrom } from 'rxjs';
import { MenuAvatarComponent } from 'src/app/components/menu-avatar/menu-avatar.component';
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
   
  get avatar() {
    return this.personagem?.avatar || 'assets/avatar/avatar_1.jpg';
  }

  get personagemAtivo() {
    return UtilService.getPersonagem();
  }

  constructor(
    public personagemService: PersonagemService,
    public router: Router,
    public dialog: DialogService
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
    this.personagem = new Personagem();
    this.etapa = ETelaInicial.NOVO_PERSONAGEM;
  }

  editarPersonagem() {
    this.personagem = this.personagemAtivo;
    this.etapa = ETelaInicial.NOVO_PERSONAGEM;
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

  mudarAvatar() {
    this.dialog.open(MenuAvatarComponent, {
      header: 'Selecione um Avatar'
    }).onClose.subscribe({
      next: (value) => {
        if(value) {
          this.personagem.avatar = value;
        }
      },
    })
  }
}

