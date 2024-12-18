import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { EFeedback, ETipoFeedback } from 'src/app/model/enum/EFeedback';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss',
})
export class FeedbackComponent {

  @Output()
  clearFeedback: EventEmitter<void> = new EventEmitter<void>();

  private timeoutId: any;
  private _tipo: ETipoFeedback = ETipoFeedback.VAZIO;
  
  mensagem: string = '';

  @Input()
  set tipo(value: ETipoFeedback) {
    this._tipo = value;
    this.changeMessage(); 
  }

  get tipo(): ETipoFeedback {
    return this._tipo;
  }

  changeMessage() {
    if (this._tipo === ETipoFeedback.VAZIO) {
      return;
    }
    const mensagens = EFeedback.padrao.filter((m) => m.value === this._tipo);
    for (let i = mensagens.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mensagens[i], mensagens[j]] = [mensagens[j], mensagens[i]];
    }
    this.mensagem = mensagens[0]?.label;

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this._tipo = ETipoFeedback.VAZIO;
      this.clearFeedback.emit();
      this.timeoutId = null;
    }, 2000);
  }
}
