import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ETipoFeedback } from 'src/app/model/enum/EFeedback';
import { Palavra } from 'src/app/model/Palavra';
import familiaData from '../../data/familia-padrao.json';
import { UtilService } from 'src/app/service/util.service';

class PalavraJogo {
  palavra: string;
  pendente: boolean;
}

@Component({
  selector: 'app-jogo-palavras',
  templateUrl: './jogo-palavras.component.html',
  styleUrl: './jogo-palavras.component.scss',
})
export class JogoPalavrasComponent implements OnInit {
  palavras: Palavra[] = [];
  palavrasJogo: PalavraJogo[] = [];
  selectedPalavra: Palavra;

  feedback: ETipoFeedback = ETipoFeedback.VAZIO;
  acerto: boolean = false;
  animacao: boolean = false;

  constructor(public msg: MessageService, private cdr: ChangeDetectorRef) {}

  get isFacil() {
    return UtilService.getPersonagem().dificuldade == 'FACIL';
  }

  get isMedio() {
    return UtilService.getPersonagem().dificuldade == 'MEDIO';
  }

  ngOnInit(): void {
    this.palavras = familiaData as Palavra[];
    this.novoJogo();
  }

  novoJogo(): void {
    this.acerto = false;
    this.sortearPalavra();
  }

  sortearPalavra() {
    this.selectedPalavra = this.palavras[Math.floor(Math.random() * this.palavras.length)];
  
    this.palavrasJogo = this.selectedPalavra.opcoes.map((o) => ({
      palavra: o,
      pendente: true,
    }));
  
    const palavraCorreta = {
      palavra: this.selectedPalavra.descricao,
      pendente: true,
    };
  
    if (!this.palavrasJogo.some((p) => p.palavra === palavraCorreta.palavra)) {
      this.palavrasJogo.push(palavraCorreta);
    }
  
    this.palavrasJogo = this.palavrasJogo.sort(() => Math.random() - 0.5);
  
    const limite = this.isFacil ? 3 : this.isMedio ? 4 : this.palavrasJogo.length;
    this.palavrasJogo = this.palavrasJogo.slice(0, limite);
  
    if (!this.palavrasJogo.some((p) => p.palavra === palavraCorreta.palavra)) {
      this.palavrasJogo.pop(); 
      this.palavrasJogo.push(palavraCorreta); 
    }
  }

  verificarResposta(opcao: PalavraJogo): void {
    if (this.acerto || !opcao.pendente) return;
    if (opcao.palavra == this.selectedPalavra.descricao) {
      this.acerto = true;
      this.feedback = ETipoFeedback.ACERTO;
    } else {
      opcao.pendente = false;
      this.feedback = ETipoFeedback.ERRO;
    }
  }

  getAcerto(opcao: string) {
    return opcao == this.selectedPalavra.descricao && this.acerto;
  }

  clearFeedback() {
    this.feedback = ETipoFeedback.VAZIO;
  }
}
