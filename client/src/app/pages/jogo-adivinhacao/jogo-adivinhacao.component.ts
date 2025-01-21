import { Component, OnInit } from '@angular/core';
import letrasData from '../../data/alfabeto-manual.json';
import palavraPadraoData from '../../data/animais-padrao.json';
import { MessageService } from 'primeng/api';
import { Letra } from 'src/app/model/interface/ILetra';
import { PalavraService } from 'src/app/service/palavra.service';
import { Palavra } from 'src/app/model/Palavra';
import { ETipoFeedback } from 'src/app/model/enum/EFeedback';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-jogo-adivinhacao',
  templateUrl: './jogo-adivinhacao.component.html',
  styleUrl: './jogo-adivinhacao.component.scss',
  providers: [MessageService],
})
export class JogoAdivinhacaoComponent implements OnInit {
  letras: Letra[] = [];
  draggedLetra: Letra;
  selectedLetras: (Letra | null)[] = [];

  obj: PalavraJogoAdivinhacaoDTO;

  palavras: Palavra[] = [];
  selectedPalavra: Palavra = new Palavra();

  endGame: boolean = true;
  feedback: ETipoFeedback = ETipoFeedback.VAZIO;

  constructor(
    public msg: MessageService,
    public palavraService: PalavraService
  ) {
    this.letras = letrasData;
    this.palavras = palavraPadraoData as Palavra[];
  }

  get dicaLetra() {
    return UtilService.getPersonagem().dificuldade == 'FACIL';
  }

  get dicaPalavra() {
    return ['FACIL', 'MEDIO'].includes(UtilService.getPersonagem().dificuldade);
  }


  ngOnInit() {
    this.carregaObjetos();
  }

  async carregaObjetos() {
    // this.palavras = await firstValueFrom(
    //   this.palavraService.getAllRequest(undefined, 0, 100)
    // );
    await this.geraNovaPalavra();
  }

  async geraNovaPalavra() {
    this.endGame = false;
    this.selectedPalavra =
      this.palavras[Math.floor(Math.random() * this.palavras.length)];

    this.obj = {
      palavra: this.selectedPalavra.descricao.toUpperCase(),
      letras: this.selectedPalavra.descricao.toUpperCase().split(''),
      acertos: [],
    };

    this.selectedLetras = Array(this.obj.palavra.length).fill(null);
  }

  async palavraCompleta() {
    // this.msg.add({
    //   severity: 'success',
    //   summary: 'Aviso',
    //   detail: 'Parabéns!',
    // });
    this.endGame = true;
    // setTimeout(async () => {
    //   await this.geraNovaPalavra();
    // }, 1000);
  }

  getImage() {
    return this.selectedPalavra.imagem;
  }

  dragStart(letra: Letra) {
    this.draggedLetra = letra;
  }

  drop(index: number) {
    if (
      this.draggedLetra &&
      this.obj.letras[index] === this.draggedLetra.letra
    ) {
      this.feedback = ETipoFeedback.ACERTO;
      this.selectedLetras[index] = this.draggedLetra;
      this.obj.acertos[index] = this.draggedLetra.letra;
      if (
        this.obj.letras.length === this.obj.acertos.length &&
        this.obj.letras.every((letra, index) => letra === this.obj.acertos[index])
      ) {
        this.palavraCompleta();
      }
    } else {
      this.feedback = ETipoFeedback.ERRO;
    }
    this.draggedLetra = null;
  }

  dragEnd() {
    this.draggedLetra = null;
  }

  findIndex(product: Letra) {
    let index = -1;
    for (let i = 0; i < this.letras.length; i++) {
      if (product.letra === this.letras[i].letra) {
        index = i;
        break;
      }
    }
    return index;
  }

  clearFeedback() {
    this.feedback = ETipoFeedback.VAZIO;
  }
}

export interface PalavraJogoAdivinhacaoDTO {
  palavra: string;
  letras: string[];
  acertos: string[];
}
