import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../usuario/usuario.service';
import { Casa } from '../casa/casa.service';

export interface Anuncio {
    id: number;
    usuario: Usuario;
    casa: Casa;
    descricao: string;
    vagasDisponiveis: number;
    ativo: boolean;
}

export interface AnuncioCriarParams {
    id: number;
    usuario: Usuario;
    casa: Casa;
    descricao: string;
    vagasDisponiveis: number;
}

export interface AnuncioAtualizarParams {
    usuario: Usuario;
    casa: Casa;
    descricao: string;
    vagasDisponiveis: number;
    ativo: boolean;
}

export interface AnuncioFilter {
    search?: string;
}


@Injectable({
    providedIn: 'root'
})
export class AnuncioService {

    constructor(private apiService: ApiService) { }
    public listar(): Observable<Anuncio[]> {
        return this.apiService.get<Anuncio[]>('anuncio');

    }

    public get(anuncioId: number): Observable<Anuncio> {
        return this.apiService.get<Anuncio>(`anuncio/${anuncioId}`);
    }

    public salvar(anuncio: AnuncioCriarParams): Observable<Anuncio> {
        return this.apiService.post<Anuncio>(`anuncio`, anuncio);
    }

    public atualizar(anuncioId: number, anuncio: AnuncioAtualizarParams): Observable<Anuncio> {
        return this.apiService.put<Anuncio>(`anuncio/${anuncioId}`, anuncio);
    }

    public remover(anuncioId: number) {
        return this.apiService.delete(`anuncio/${anuncioId}`);
    }

}
