import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/app/environments/environments';
import { CepModel } from 'src/app/modelo/cep.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  private apiUrl: string = enviroment.apiUrl;
  constructor(private http: HttpClient) { }

  pesquisarCep(cep: string):Observable<CepModel>{
    return this.http.get<CepModel>(`${this.apiUrl}/${cep}/json/`);
  }
}
