import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  constructor(private notificaoService: MatSnackBar) { }

  notificacao(mensagem: string) : void{
    const options = { duration: 5000 };
    this.notificaoService.open(mensagem, "OK", options);
  }
}
