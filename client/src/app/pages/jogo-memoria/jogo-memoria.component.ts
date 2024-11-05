import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import letrasData from '../../data/alfabeto-manual.json';
import { Letra } from 'src/app/model/interface/letra';

@Component({
  selector: 'app-jogo-memoria',
  templateUrl: './jogo-memoria.component.html',
  styleUrl: './jogo-memoria.component.scss'
})
export class JogoMemoriaComponent implements OnInit {
  letras: Letra[] = [];
  cartas: Carta[] = [];
  primeiraCarta: Carta | null = null;
  segundaCarta: Carta | null = null;
  bloqueado: boolean = false;

  constructor(public msg: MessageService) {}

  ngOnInit(): void {
    this.letras = this.sorteador();
    this.cartas = this.criarCartas();
  }

  sorteador(): Letra[] {
    const shuffled = [...letrasData];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 8);
  }

  criarCartas(): Carta[] {
    const cartasLetra= [...this.letras].map(letra => ({
      ...letra,
      revelado: false,
      figura: false
    }));
    const cartasImagem = [...this.letras].map(letra => ({
      ...letra,
      revelado: false,
      figura: true
    }))
    return this.embaralhar([...cartasLetra, ...cartasImagem]);
  }

  embaralhar(cartas: Carta[]): Carta[] {
    for (let i = cartas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
    }
    return cartas;
  }

  revelarCarta(carta: Carta): void {
    if (this.bloqueado || carta.revelado || (this.primeiraCarta && this.segundaCarta)) return;

    carta.revelado = true;

    if (!this.primeiraCarta) {
      this.primeiraCarta = carta;
    } else if (!this.segundaCarta) {
      this.segundaCarta = carta;
      this.verificarPar();
    }
  }

  verificarPar(): void {
    if (this.primeiraCarta && this.segundaCarta) {
      if (this.primeiraCarta.letra === this.segundaCarta.letra) {
        this.resetarCartas();
      } else {
        this.bloqueado = true;
        setTimeout(() => {
          if (this.primeiraCarta) this.primeiraCarta.revelado = false;
          if (this.segundaCarta) this.segundaCarta.revelado = false;
          this.resetarCartas();
        }, 1000);
      }
    }
  }

  resetarCartas(): void {
    this.primeiraCarta = null;
    this.segundaCarta = null;
    this.bloqueado = false;
  }
}

export interface Carta extends Letra {
  figura: boolean;
  revelado: boolean;
}