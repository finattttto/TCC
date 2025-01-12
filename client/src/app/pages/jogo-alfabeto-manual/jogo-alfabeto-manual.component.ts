import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import letrasData from '../../data/alfabeto-manual.json';
import { ETipoFeedback } from 'src/app/model/enum/EFeedback';
import { Letra } from 'src/app/model/interface/ILetra';

class LetraJogoAlfabetoManual {
  letra: Letra;
  pendente: boolean;
}

@Component({
  selector: 'app-jogo-alfabeto-manual',
  templateUrl: './jogo-alfabeto-manual.component.html',
  styleUrl: './jogo-alfabeto-manual.component.scss',
})
export class JogoAlfabetoManualComponent implements OnInit {
  letras: Letra[] = [];
  letraSorteada: Letra | null = null; 
  opcoes: LetraJogoAlfabetoManual[] = [];

  feedback: ETipoFeedback = ETipoFeedback.VAZIO;
  acerto: boolean = false;
  animacao: boolean = false;

  constructor(public msg: MessageService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.letras = letrasData;
    this.novoJogo();
  }

  novoJogo(): void {
    this.acerto = false;
    this.letraSorteada = this.sortearLetra();
    this.opcoes = this.gerarOpcoes();
    this.inicioAnimacao();
  }

  sortearLetra(): Letra {
    const index = Math.floor(Math.random() * this.letras.length);
    return this.letras[index];
  }

  gerarOpcoes(): LetraJogoAlfabetoManual[] {
    const opcoes = [this.letraSorteada!];
    const restantes = this.letras.filter((letra) => letra !== this.letraSorteada);
    while (opcoes.length < 5) {
      const index = Math.floor(Math.random() * restantes.length);
      opcoes.push(restantes.splice(index, 1)[0]);
    }

    return this.embaralharArray(opcoes);
  }

  embaralharArray(array: Letra[]): LetraJogoAlfabetoManual[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.map((item) => ({ letra: item, pendente: true }));
  }

  verificarResposta(opcao: LetraJogoAlfabetoManual): void {
    if(this.acerto || !opcao.pendente) return;
    if (opcao.letra == this.letraSorteada) {
      this.acerto = true;
      this.feedback = ETipoFeedback.ACERTO;
    } else {
      opcao.pendente = false;
      this.feedback = ETipoFeedback.ERRO;
    }
  }

  getAcerto(opcao: Letra) {
    return opcao == this.letraSorteada && this.acerto;
  }

  clearFeedback() {
    this.feedback = ETipoFeedback.VAZIO;
  }

  inicioAnimacao(): void {
    this.animacao = true;

    setTimeout(() => {
      this.animacao = false;
    }, 600);
  }

  fimAnimacao(): void {
    this.animacao = false; 
  }
}
