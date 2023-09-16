import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private isAuthenticated:boolean = false;

  login(email:string, senha: string): boolean {
    if (email === 'empresavictor@gmail.com' && senha === '123') {
      this.isAuthenticated = true;
      return true;
    } else {
      this.isAuthenticated = false;
      return false;
    }
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
