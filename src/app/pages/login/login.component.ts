import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../core/services/autenticacao.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacaoService } from '../../core/services/notificacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  formLogin!:FormGroup;
  textoAutenticacao!:string;
  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService,
    private fb:FormBuilder,
    private notificacaoService: NotificacaoService
    ){}
    ngOnInit(): void {
      this.iniciarForm();
    }
    iniciarForm(){
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    })
  }
  login(){
    if(this.formLogin.valid){
     const isAuthenticated = this.autenticacaoService.login(this.formLogin.get('email')?.value, this.formLogin.get('senha')?.value);
    if (isAuthenticated) {
      // Login bem-sucedido, redireciona para a página protegida
      this.router.navigate(['/empresas']);
      this.notificacaoService.notificacao('Usuário logado com sucesso.');
    } else {
      this.notificacaoService.notificacao('E-mail ou senha inválidos!');
     }
    }
  }
}
