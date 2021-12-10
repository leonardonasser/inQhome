import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { environment } from 'src/environments/environment';

export interface Usuario {
  idUsuario: number;
  nome: string;
  email: string;
  ativo: boolean;
}

export interface UsuarioCriarParams {
  idUsuario: number;
  login: string;
  senha: string;
}

export interface UsuarioAtualizarParams {
  idUsuario: number;
  nome: string;
  email: string;
  ativo: boolean;
}

export interface UsuarioFilter {
  search?: string;
}


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private apiService: ApiService) { }
  public listar(): Observable<Usuario[]> {
   return this.apiService.get<Usuario[]>('usuario');
 
  }

  public get(usuarioId: number): Observable<Usuario> {
    return this.apiService.get<Usuario>(`usuario/${usuarioId}`);
  }

  public salvar(usuario: UsuarioCriarParams): Observable<Usuario> {
    return this.apiService.post<Usuario>(`usuario`, usuario);
  }

  public atualizar(usuarioId: number, usuario: UsuarioAtualizarParams): Observable<Usuario> {
    return this.apiService.put<Usuario>(`usuario/${usuarioId}`, usuario);
  }

  public remover(usuarioId: number) {
    return this.apiService.delete(`usuario/${usuarioId}`);
  }

}
