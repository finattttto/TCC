import { Injectable } from '@angular/core';

export enum ELocalStorageKeys {
  AUTH_LIBRAS = 'AUTH_LIBRAS',
}

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private static auth;

  public static setAuth(value: string) {
    this.auth = value;
    localStorage.setItem(ELocalStorageKeys.AUTH_LIBRAS, value);
  }

  public static getAuth() {
    if(this.auth) return this.auth;
    this.auth = localStorage.getItem('cfgLocal');
    return this.auth;
  }
}
