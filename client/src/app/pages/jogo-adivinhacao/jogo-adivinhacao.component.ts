import { Component, OnInit } from '@angular/core';
import letrasData from '../../data/alfabeto-manual.json';
import { MessageService } from 'primeng/api';
import { Letra } from 'src/app/model/interface/ILetra';
import { PalavraService } from 'src/app/service/palavra.service';
import { Palavra } from 'src/app/model/Palavra';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-jogo-adivinhacao',
  templateUrl: './jogo-adivinhacao.component.html',
  styleUrl: './jogo-adivinhacao.component.scss',
  providers: [MessageService]
})
export class JogoAdivinhacaoComponent implements OnInit {

  letras: Letra[] = [];
  draggedLetra: Letra;
  selectedLetras: (Letra | null)[] = [];

  obj: PalavraJogoAdivinhacaoDTO;

  palavras: Palavra[] = [];
  selectedPalavra: Palavra;

  constructor(
    public msg: MessageService,
    public palavraService: PalavraService
  ) {

  }

  async ngOnInit(): Promise<void> {
    this.letras = letrasData;
    this.palavras = await firstValueFrom(this.palavraService.getAllRequest(undefined, 0, 100));
    await this.geraNovaPalavra();
  }

  async geraNovaPalavra() {
    this.selectedPalavra = this.palavras[Math.floor(Math.random() * this.palavras.length)];

    this.obj = {
      palavra: this.selectedPalavra.descricao.toUpperCase(),
      letras: this.selectedPalavra.descricao.toUpperCase().split(""),
      acertos: []
    }

    this.selectedLetras = Array(this.obj.palavra.length).fill(null);
  }

  async palavraCompleta() {
    this.msg.add({
      severity: "success",
      summary: "Aviso",
      detail: "Parabéns!",
    })
    setTimeout(async () => {
      await this.geraNovaPalavra();
    }, 1000)
  }

  getImage(){
    return this.selectedPalavra.imagem;
  }

  dragStart(letra: Letra) {
    this.draggedLetra = letra;
  }

  drop(index: number) {
    if (this.draggedLetra && this.obj.letras[index] === this.draggedLetra.letra) {
      this.selectedLetras[index] = this.draggedLetra;
      this.obj.acertos[index] = this.draggedLetra.letra;
      if(this.obj.letras.length == this.obj.acertos.length) {
        this.palavraCompleta();
      }
    } else {
      this.msg.add({
        severity: "info",
        summary: "Aviso",
        detail: "Letra incorreta!",
      })
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
}

export interface PalavraJogoAdivinhacaoDTO {
  palavra: string;
  letras: string[];
  acertos: string[];
}
