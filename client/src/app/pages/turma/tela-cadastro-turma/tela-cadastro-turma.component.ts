import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { firstValueFrom } from 'rxjs';
import { Palavra } from 'src/app/model/Palavra';
import { Turma } from 'src/app/model/Turma';
import { PalavraService } from 'src/app/service/palavra.service';
import { TurmaService } from 'src/app/service/turma.service';

@Component({
  selector: 'app-tela-cadastro-turma',
  templateUrl: './tela-cadastro-turma.component.html',
  styleUrl: './tela-cadastro-turma.component.scss',
})
export class TelaCadastroTurmaComponent implements OnInit {
  turma: Turma = new Turma();
  palavrasTurma: Palavra[] = [];

  palavra: Palavra;
  palavras: Palavra[] = [];

  suggestions: Palavra[];
  searchQuery: string = '';

  constructor(
    public service: TurmaService,
    public palavraService: PalavraService,
    public message: MessageService
  ) {}

  async ngOnInit() {
    this.palavras = await firstValueFrom(this.palavraService.getAllRequest());
  }

  save() {
    this.turma.palavras = this.palavrasTurma.map((p) => p.id);
    this.service.savePromise(this.turma).then((ret) => {
      this.message.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Turma cadastrada com sucesso!'
      });
      this.turma = new Turma();
      this.palavra = null;
      this.palavrasTurma = [];
    }).catch((err) => {
      console.error(err);
      this.message.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Ocorreu um erro ao cadastrar a turma!'
      });
    })
  }

  adicionarPalavra() {
    if(!this.palavra?.id) {
      this.message.add({
        severity: 'info',
        summary: 'Aviso',
        detail: 'Selecione uma palavra para adicionar!'
      });
      return;
    }
    const found = this.palavrasTurma.find((p) => p.id == this.palavra.id);
    if(found) {
      this.message.add({
        severity: 'info',
        summary: 'Aviso',
        detail: 'Essa palavra ja foi adicionada!'
      });
      return;
    }
    this.palavrasTurma.push(this.palavra)
  }

  removerPalavra(palavra: Palavra) {
    this.palavrasTurma = this.palavrasTurma.filter((p) => p.id != palavra.id);
  }

  search(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    this.suggestions = this.palavras.filter(item => 
      item.descricao.toLowerCase().includes(query.toLowerCase())
    );
  }
}
