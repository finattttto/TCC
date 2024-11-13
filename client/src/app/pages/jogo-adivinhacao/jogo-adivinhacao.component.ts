import { Component, OnInit } from '@angular/core';
import letrasData from '../../data/alfabeto-manual.json';
import { MessageService } from 'primeng/api';
import { Letra } from 'src/app/model/interface/ILetra';

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

  obj: PalavraJogoAdivinhacao;

  constructor(
    public msg: MessageService
  ) {

  }

  ngOnInit(): void {
    this.letras = letrasData;
    this.obj = {
      palavra: "PEIXE",
      letras: ["P", "E", "I", "X", "E"],
      acertos: []
    }

    this.selectedLetras = Array(this.obj.palavra.length).fill(null);
  }

  getImage(){
    return "https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-cute-fish-cartoon-png-image_11519691.png";
  }

  dragStart(letra: Letra) {
    this.draggedLetra = letra;
  }

  drop(index: number) {
    if (this.draggedLetra && this.obj.letras[index] === this.draggedLetra.letra) {
      this.selectedLetras[index] = this.draggedLetra;
      this.obj.acertos[index] = this.draggedLetra.letra;
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

export interface PalavraJogoAdivinhacao {
  palavra: string;
  letras: string[];
  acertos: string[];
}
