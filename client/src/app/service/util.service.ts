import { Injectable } from '@angular/core';
import { Personagem } from '../model/Personagem';
import { Usuario } from '../model/Usuario';

export enum ELocalStorageKeys {
  AUTH_LIBRAS = 'AUTH_LIBRAS',
  USUARIO_LOGADO = 'USUARIO_LOGADO',
  PERSONAGEM = 'PERSONAGEM'
}

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private static auth;
  private static usuario;
  private static personagem;

  public static isLoggedIn(): boolean {
    return !!this.auth;
  }

  public static setAuth(value: string) {
    this.auth = value;
    localStorage.setItem(ELocalStorageKeys.AUTH_LIBRAS, value);
  }

  public static getAuth() {
    if(this.auth) return this.auth;
    this.auth = localStorage.getItem(ELocalStorageKeys.AUTH_LIBRAS);
    return this.auth;
  }

  public static setUsuario(value: Usuario) {
    this.usuario = value;
    localStorage.setItem(ELocalStorageKeys.USUARIO_LOGADO, JSON.stringify(value));
  }

  public static getUsuario() {
    if(this.usuario) return this.usuario;
    this.usuario = JSON.parse(localStorage.getItem(ELocalStorageKeys.USUARIO_LOGADO));
    return this.usuario;
  }

  public static setPersonagem(value: Personagem) {
    this.personagem = value;
    localStorage.setItem(ELocalStorageKeys.PERSONAGEM, JSON.stringify(value));
  }

  public static getPersonagem() {
    if(this.personagem) return this.personagem;
    this.personagem = JSON.parse(localStorage.getItem(ELocalStorageKeys.PERSONAGEM));
    return this.personagem;
  }
}
