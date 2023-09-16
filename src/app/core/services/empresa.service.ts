import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviromentsDevelopments } from '../../environments/environments.developments';
import { EmpresaModel } from 'src/app/modelo/empresa.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  
  private apiUrl: string = enviromentsDevelopments.apiUrl;
  constructor(private http: HttpClient) { }

  cadastrarEmpresa(empresa: EmpresaModel): Observable<EmpresaModel> {
    return this.http.post<EmpresaModel>(this.apiUrl, empresa);
  }

  atualizarDadosEmpresa(empresa: EmpresaModel): Observable<EmpresaModel> {
    const url = `${this.apiUrl}/${empresa.id}`;
    return this.http.put<EmpresaModel>(url , empresa);
  }

  listarDadosEmpresa(): Observable<Array<EmpresaModel>>{
    return this.http.get<Array<EmpresaModel>>(this.apiUrl);
  }

  obterEmpresaPorId(id: number): Observable<EmpresaModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<EmpresaModel>(url);
  }

  excluirEmpresa(id: number): Observable<EmpresaModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<EmpresaModel>(url);
  }
}
