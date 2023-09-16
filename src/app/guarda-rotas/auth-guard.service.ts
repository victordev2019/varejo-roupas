import { Injectable } from '@angular/core';
import { AutenticacaoService } from '../core/services/autenticacao.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router
    ) { }

    canActivate(): boolean {
      if (this.autenticacaoService.isLoggedIn()) {
        return true;
      } else {
        this.router.navigate(['/empresas/login']);
        return false;
      }
    }
}
