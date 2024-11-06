import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Letra } from 'src/app/model/interface/letra';
import letrasData from '../../data/alfabeto-manual.json';
import { ETipoFeedback } from 'src/app/model/enum/EFeedback';

@Component({
  selector: 'app-jogo-alfabeto-manual',
  templateUrl: './jogo-alfabeto-manual.component.html',
  styleUrl: './jogo-alfabeto-manual.component.scss',
})
export class JogoAlfabetoManualComponent implements OnInit {
  letras: Letra[] = [];
  letraSorteada: Letra | null = null; 
  opcoes: Letra[] = [];

  feedback: ETipoFeedback = ETipoFeedback.VAZIO;

  constructor(public msg: MessageService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.letras = letrasData;
    this.novoJogo();
  }

  novoJogo(): void {
    this.letraSorteada = this.sortearLetra();
    this.opcoes = this.gerarOpcoes();
  }


  sortearLetra(): Letra {
    const index = Math.floor(Math.random() * this.letras.length);
    return this.letras[index];
  }

  gerarOpcoes(): Letra[] {
    const opcoes = [this.letraSorteada!];
    const restantes = this.letras.filter((letra) => letra !== this.letraSorteada);
    while (opcoes.length < 5) {
      const index = Math.floor(Math.random() * restantes.length);
      opcoes.push(restantes.splice(index, 1)[0]);
    }

    return this.embaralharArray(opcoes);
  }

  embaralharArray(array: Letra[]): Letra[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


  verificarResposta(opcao: Letra): void {
    if (opcao == this.letraSorteada) {
      this.feedback = ETipoFeedback.ACERTO;
      this.novoJogo();
    } else {
      this.feedback = ETipoFeedback.ERRO;
    }
  }

  clearFeedback() {
    this.feedback = ETipoFeedback.VAZIO;
  }
}
