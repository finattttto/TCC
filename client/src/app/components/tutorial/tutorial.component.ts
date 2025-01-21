import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './tutorial.component.html',
  styleUrl: './tutorial.component.scss'
})
export class TutorialComponent implements OnInit {

  @Input()
  atividade: 'JOGO_ADIVINHACAO' | 'JOGO_MEMORIA' | 'JOGO_ALFABETO' | 'JOGO_PALAVRAS';

  visible: boolean = false;
  tutorial: string;

  ngOnInit(): void {
    switch(this.atividade) {
      case 'JOGO_ADIVINHACAO':
        this.tutorial = 'https://cdn.dribbble.com/users/303272/screenshots/1073851/tutorial.gif';
        break;
      case 'JOGO_MEMORIA':
        this.tutorial = 'https://cdn.dribbble.com/users/303272/screenshots/1073851/tutorial.gif';
        break;
      case 'JOGO_ALFABETO':
        this.tutorial = 'https://cdn.dribbble.com/users/303272/screenshots/1073851/tutorial.gif';
        break;
      case 'JOGO_PALAVRAS':
        this.tutorial = 'https://cdn.dribbble.com/users/303272/screenshots/1073851/tutorial.gif';
        break;
    }
  }
}
