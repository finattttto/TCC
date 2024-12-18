import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Palavra } from 'src/app/model/Palavra';
import { PalavraService } from 'src/app/service/palavra.service';

@Component({
  selector: 'app-tela-lista-palavra',
  templateUrl: './tela-lista-palavra.component.html',
  styleUrl: './tela-lista-palavra.component.scss'
})
export class TelaListaPalavraComponent implements OnInit {

  palavras: Palavra[] = [];

  constructor(
    public service: PalavraService
  ){}

  async ngOnInit() {
    this.palavras = await firstValueFrom(this.service.getAllRequest());
  }
}
