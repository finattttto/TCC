import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import Dexie from 'dexie';
import { TurmaService } from '../service/turma.service';
import { ELocalStorageKeys } from '../service/util.service';
import { main } from '../app.component';
import { Personagem } from '../model/Personagem';

export enum EEntidades {
  PERSONAGEM = 'PERSONAGEM',
  PALAVRA = 'PALAVRA',
  TURMA = 'TURMA',
}

@Injectable({
  providedIn: 'root',
})
export class IndexDbService {
  public static onCarregouSala: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public http: HttpClient,
    public router: Router,
    public turmaService: TurmaService
  ) {}

  static getDb(): Dexie {
    const dbName = 'JOGO_LIBRAS_DATA';
    const db = new Dexie(dbName);
    db.version(1).stores({
      PERSONAGEM: '++id, nome',
      TURMA: '++id, nome',
      PALAVRA: '++id, descricao',
      CONFIG: 'key',
    });
    return db;
  }

  static async salvarNoIndexedDB(entidade: string, itens: any[]) {
    const db = this.getDb();
    if (!itens) itens = [];
    try {
      await db.open();
      await db.table(entidade).clear();
      await db.table(entidade).bulkPut(itens);
    } catch (error) {
      console.log(`ERRO NA ENTIDADE: ${entidade}`);
      console.log(error);
    }
  }

  public async sincronizaSala() {
    const codigo = localStorage.getItem(ELocalStorageKeys.CODIGO_TURMA);
    const db = IndexDbService.getDb();
    await db.open();
    try {
      const turma = await db.table(EEntidades.TURMA).toArray();
      if (turma[0]?.codigo == codigo) {
        return main.msg.add({
          severity: 'info',
          summary: 'Aviso',
          detail: 'Turma já carregada!',
        });
      }
      await db.table('PALAVRA').clear();
      await db.table('TURMA').clear();
      const sala = await firstValueFrom(
        this.turmaService.buscaPeloCodigo(codigo)
      );
      if (!sala?.turma) {
        localStorage.removeItem(ELocalStorageKeys.CODIGO_TURMA);
        return main.msg.add({
          severity: 'info',
          summary: 'Aviso',
          detail: 'Código de sala inválido!',
        });
      }
      await IndexDbService.salvarNoIndexedDB('TURMA', [sala.turma]);
      await IndexDbService.salvarNoIndexedDB('PALAVRA', sala.palavras);
      main.msg.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Sala carregada com sucesso!',
      });
    } catch (error) {
      main.msg.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Ocorreu um erro ao carregar a Sala!',
      });
      console.error(error);
    } finally {
      db.close();
      IndexDbService.onCarregouSala.emit();
    }
  }

  static async salvaPersonagem(personagem: Personagem) {
    if (!personagem?.id) {
      personagem.id = await IndexDbService.proximoId('personagem_id');
    }

    const db = this.getDb();
    try {
      await db.open();
      await db.table(EEntidades.PERSONAGEM).put(personagem);
    } catch (error) {
      main.msg.add({
        severity: 'error',
        summary: "Erro",
        detail: 'Ocorreu um erro ao salvar o personagem!'
      })
    }
    db.close();
    return personagem;
  }

  static async proximoId(entidade: string) {
    const db = this.getDb();
    try {
      await db.open();

      const config = await db.table('CONFIG').get(entidade);
      let lastNegativeId = config?.value ?? -1;
      const newNegativeId = lastNegativeId - 1;

      await db.table('CONFIG').put({ key: entidade, value: newNegativeId });
      return newNegativeId;
    } catch (error) {
      console.error('Erro ao gerar ID negativo:', error);
      throw error;
    }
  }
}
