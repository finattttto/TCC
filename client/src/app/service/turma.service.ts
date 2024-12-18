import { Injectable } from '@angular/core';
import { Turma } from '../model/Turma';
import { AbstractService } from './abstract.service';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class TurmaService extends AbstractService<Turma> {
  override endpoint: string = 'turma';

  constructor(http: HttpClient) {
    super(http);
  }
}
