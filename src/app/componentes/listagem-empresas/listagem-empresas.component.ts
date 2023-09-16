import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { FormatService } from 'src/app/core/services/format.service';
import { EmpresaModel } from 'src/app/modelo/empresa.model';
import { NotificacaoService } from '../../core/services/notificacao.service';

@Component({
  selector: 'app-listagem-empresas',
  templateUrl: './listagem-empresas.component.html',
  styleUrls: ['./listagem-empresas.component.scss']
})
export class ListagemEmpresasComponent implements OnInit {
  empresas:EmpresaModel[] = [];
  displayedColumns: string[] = ['cnpj', 'razaoSocial', 'cep', 'estado', 'acoes'];
  constructor(
    private empresaService: EmpresaService,
    public formatService: FormatService,
    private notificacaoService: NotificacaoService
    ){}
  ngOnInit(): void {
    this.listarDadosEmpresa();
  }

  listarDadosEmpresa(){
    this.empresaService.listarDadosEmpresa().subscribe((empresas => this.empresas = empresas));
  }

  excluirEmpresa(id:number){
    this.empresaService.excluirEmpresa(id).subscribe({
      next: () => {
        this.notificacaoService.notificacao('Empresa removida com sucesso');
        this.empresas = this.empresas.filter(empresa => empresa.id !== id);
      },
      error: (error) => {
        console.error('Erro ao excluir empresa:', error);
      }
    });
  }
}
