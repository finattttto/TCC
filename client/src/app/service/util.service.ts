import { Injectable } from '@angular/core';

export enum ELocalStorageKeys {
  AUTH_LIBRAS = 'AUTH_LIBRAS',
  USUARIO_LOGADO = 'USUARIO_LOGADO',
}

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private static auth;
  private static usuario;

  public static setAuth(value: string) {
    this.auth = value;
    localStorage.setItem(ELocalStorageKeys.AUTH_LIBRAS, value);
  }

  public static getAuth() {
    if(this.auth) return this.auth;
    this.auth = localStorage.getItem(ELocalStorageKeys.AUTH_LIBRAS);
    return this.auth;
  }

  public static setUsuario(value: string) {
    this.usuario = value;
    localStorage.setItem(ELocalStorageKeys.USUARIO_LOGADO, JSON.stringify(value));
  }

  public static getUsuario() {
    if(this.usuario) return this.usuario;
    this.usuario = JSON.parse(localStorage.getItem(ELocalStorageKeys.USUARIO_LOGADO));
    return this.usuario;
  }

  public static isLoggedIn(): boolean {
    return !!this.auth;
  }
}
