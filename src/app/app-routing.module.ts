import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ListagemEmpresasComponent } from './componentes/listagem-empresas/listagem-empresas.component';
import { AuthGuard } from './guarda-rotas/auth-guard.service';

const routes: Routes = [
  {
    path: 'empresas',
    children: [
      { path: 'cadastro', component: CadastroComponent , canActivate: [AuthGuard] },
      { path: 'alterar/:id', component: CadastroComponent , canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomeComponent },
      { path: '', component: ListagemEmpresasComponent , canActivate: [AuthGuard], },
    ]
  },
  { path: '', redirectTo: 'empresas/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
