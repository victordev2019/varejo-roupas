import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaCepService } from '../../core/services/consulta-cep.service';
import { CepModel } from 'src/app/modelo/cep.model';
import { NotificacaoService } from '../../core/services/notificacao.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { EmpresaModel } from 'src/app/modelo/empresa.model';
import { FormatService } from 'src/app/core/services/format.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  cadastroForm!: FormGroup;
  cep!: CepModel;
  empresa!: EmpresaModel;
  id:number = this.route.snapshot.params['id'];
  texto!:string;
  titulo!:string;
  constructor(
    private fb: FormBuilder,
    private cepService: ConsultaCepService,
    private notificacaoService: NotificacaoService,
    private empresaService: EmpresaService,
    private formatService: FormatService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.iniciarForm();
    if (this.id) {
      this.carregarEmpresaPorId(this.id);
    }
}

  iniciarForm() {
    this.cadastroForm = this.fb.group({
      id:[''],
      cnpj: ['', Validators.required],
      razaoSocial: ['', Validators.required],
      cep: ['', Validators.required],
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  voltarTelaAnterior(){
    this.location.back();
  }

  buscarCEP() {
    const cep = this.cadastroForm.get('cep')?.value;
    this.cepService.pesquisarCep(cep).subscribe({
      next: (cepRetornado: CepModel) => {
        this.cep = cepRetornado;
        this.cadastroForm.patchValue({
          endereco: this.cep.logradouro,
          bairro: this.cep.bairro,
          cidade: this.cep.localidade
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 0) this.notificacaoService.notificacao('Cep Inválido');
      },
    });
  }

  onCEPInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let cepValue = inputElement.value;
    const limiteCaracteres = 9;
    cepValue = cepValue.replace(/[^\d-]/g, '');
    cepValue = cepValue.replace(/-+/g, '-');
    if (cepValue.length > limiteCaracteres) {
    cepValue = cepValue.slice(0, limiteCaracteres);
    }
    const formattedCEP = this.formatService.formatCEP(cepValue);
    this.cadastroForm.get('cep')?.setValue(formattedCEP);
  }
  onCNPJInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let cnpjValue = inputElement.value;
    const limiteCaracteres = 14;
    cnpjValue = cnpjValue.replace(/\D/g, '');
    if (cnpjValue.length > limiteCaracteres) {
    cnpjValue = cnpjValue.slice(0, limiteCaracteres);
  }
  const formattedCNPJ = this.formatService.formatCNPJ(cnpjValue);
  this.cadastroForm.get('cnpj')?.setValue(formattedCNPJ);
}

  submitEmpresa(){
    return this.id ? this.atualizarEmpresa() : this.cadastrar();
  }

  textoCadastrarAtualizar():string {
    return this.id ? this.texto = 'Atualizar' : 'Cadastrar';
  }

  textoCadastrarAtualizarTitulo():string{
    return this.id ? this.titulo = 'Atualização' : 'Cadastro';
  }

  cadastrar() {
    if(this.cadastroForm.valid){
     const empresa: EmpresaModel = this.cadastroForm.value;
      this.empresaService.cadastrarEmpresa(empresa).subscribe({
        next: () => {
          this.notificacaoService.notificacao('Empresa cadastrada com sucesso!');
          this.router.navigateByUrl(`empresas`);
        },
        error: (error) => {
          console.error('Erro ao cadastrar empresa:', error);
        }
      });
    }
}

atualizarEmpresa() {
  if(this.cadastroForm.valid){
  const empresa: EmpresaModel = this.cadastroForm.value;
  this.empresaService.atualizarDadosEmpresa(empresa).subscribe({
     next: () => {
      this.notificacaoService.notificacao('Empresa atualizada com sucesso!')
    },
    error: (error) => {
      console.error('Erro ao atualizar empresa:', error);
    }
  });
  }
}

limparCampos(){
  this.cadastroForm.reset();
}
carregarEmpresaPorId(id: number) {
  this.empresaService.obterEmpresaPorId(id).subscribe({
    next: (empresaRetornada: EmpresaModel) => {
      this.cadastroForm.patchValue(empresaRetornada);
    },
    error: (error) => {
      console.error('Erro ao carregar empresa por ID:', error);
    }
  });
}
}

