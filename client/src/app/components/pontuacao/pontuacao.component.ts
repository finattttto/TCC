import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pontuacao',
  templateUrl: './pontuacao.component.html',
  styleUrl: './pontuacao.component.scss',
})
export class PontuacaoComponent {
  @Input() jogador: string = '';
  @Input() acertos: number = 0;
  @Input() erros: number = 0;
  
  get pontuacao() {
    const total = this.acertos + this.erros;
    const media = total > 0 ? (this.acertos / total) * 5 : 0;
    return media;
  }
  
}
