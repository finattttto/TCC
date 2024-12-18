import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Turma } from 'src/app/model/Turma';
import { TurmaService } from 'src/app/service/turma.service';

@Component({
  selector: 'app-tela-lista-turma',
  templateUrl: './tela-lista-turma.component.html',
  styleUrl: './tela-lista-turma.component.scss'
})
export class TelaListaTurmaComponent implements OnInit {

  turmas: Turma[] = [];

  constructor(
    public service: TurmaService
  ){}

  async ngOnInit() {
    this.turmas = await firstValueFrom(this.service.getAllRequest());
  }
}
