import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../usuario/usuario.service';

export interface Casa {
  idCasa: number;
  usuarioResponsavel: Usuario;
  cep: String;
  rua: String;
  cidade: String;
  estado: String;
  numeroCasa: String;
  valorAluguel: number;
}

export interface CasaCriarParams {
  usuarioResponsavelId: number;
  valorAluguel: number;
}

export interface Despesa {
  idDespesa: number;
  titulo: string;
  casa: Casa;
  valor: number;
  dataAtribuida: Date;
  dataValidade: Date;
}

export interface DespesaCriarParams {
  titulo: string;
  casaId: number | undefined;
  valor: number;
  dataValidade: Date;
}

export interface Inquilino {
  idInquilino: number;
  usuarioInquilino: Usuario;
  casaId: number | undefined;
}

export interface InquilinoCriarParams {
  inquilinoId: number;
  casaId: number | undefined;
}


export interface CasaFilter {
  search?: string;
}


@Injectable({
  providedIn: 'root'
})
export class CasaService {

  constructor(private apiService: ApiService) { }
  
  public listar(): Observable<Casa[]> {
   return this.apiService.get<Casa[]>('casa');
  }

  public get(casaId: number): Observable<Casa> {
    return this.apiService.get<Casa>(`casa/${casaId}`);
  }

  public salvar(casa: CasaCriarParams): Observable<Casa> {
    return this.apiService.post<Casa>(`casa`, casa);
  }

  public atualizar(casaId: number, casa: CasaCriarParams): Observable<Casa> {
    return this.apiService.put<Casa>(`casa/${casaId}`, casa);
  }

  public remover(casaId: number) {
    return this.apiService.delete(`casa/${casaId}`);
  }

  
  public listarDespesa(): Observable<Despesa[]> {
    return this.apiService.get<Despesa[]>('mobile/despesas');
   }

  public salvarDespesa(despesa: DespesaCriarParams): Observable<Despesa> {
    return this.apiService.post<Despesa>(`despesas`, despesa);
  }

  public removerDespesa(despesaId: number) {
    return this.apiService.delete(`despesas/${despesaId}`);
  }


  public listarInquilino(): Observable<Inquilino[]> {
    return this.apiService.get<Inquilino[]>('inquilinos');
  }

  public salvarInquilino(inquilino: InquilinoCriarParams): Observable<Inquilino> {
    return this.apiService.post<Inquilino>(`inquilinos`, inquilino);
  }

  public removerInquilino(inquilinoId: number) {
    return this.apiService.delete(`inquilinos/${inquilinoId}`);
  }


}
