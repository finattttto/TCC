import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Letra } from 'src/app/model/interface/letra';
import letrasData from '../../data/alfabeto-manual.json';

@Component({
  selector: 'app-jogo-alfabeto-manual',
  templateUrl: './jogo-alfabeto-manual.component.html',
  styleUrl: './jogo-alfabeto-manual.component.scss',
})
export class JogoAlfabetoManualComponent implements OnInit {
  letras: Letra[] = [];

  constructor(public msg: MessageService) {}

  ngOnInit(): void {
    this.letras = this.sorteador();
  }

  sorteador() {
    const shuffled = [...letrasData];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 8);
  }
}
