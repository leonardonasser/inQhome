import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiService, ServiceError } from '../shared/services/api.service';

export interface UsuarioAuth {
  id: number;
  email: string;
  nome: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly currentUserLocalStorageKey = 'currentUser';

  private currentUserSubject: BehaviorSubject<UsuarioAuth | null>;
  public currentUserObs: Observable<UsuarioAuth | null>;

  constructor(private apiService: ApiService) {
    const currentUser = this.getCurrentUserFromLocalStorage();
    this.currentUserSubject = new BehaviorSubject<UsuarioAuth>(currentUser);
    this.currentUserObs = this.currentUserSubject.asObservable();
  }

  public get isLoggedIn(): boolean {
    return this.currentUser != null;
  }

  public get currentUser(): UsuarioAuth | null {
    return this.currentUserSubject.value;
  }

  private getCurrentUserFromLocalStorage(): any {
    const json = localStorage.getItem(this.currentUserLocalStorageKey);
    return json != null ? JSON.parse(json) : null;
  }

  private saveUserToLocalStorage(usuario: object): void {
    localStorage.setItem(this.currentUserLocalStorageKey, JSON.stringify(usuario));
  }

  public login(email: string, senha: string): Observable<UsuarioAuth> {
    const payload = {
      email,
      senha,
    };

    console.log(payload)

    return this.apiService.post<UsuarioAuth>('web/auth/login', payload)
      .pipe(
        map(usuario => {
          return usuario;
        }),
        tap(usuario => {
          this.saveUserToLocalStorage(usuario);
          this.currentUserSubject.next(usuario);
        })
      );
  }

  public logout(): void {
    localStorage.removeItem(this.currentUserLocalStorageKey);
    this.currentUserSubject.next(null);
  }

  public alterarSenha(token: string, novaSenha: string): Observable<any> {
    const payload = {
      token,
      novaSenha,
    };
    return this.apiService.post('auth/senha', payload);
  }

  public resetarSenha(email: string): Observable<any> {
    const payload = { email };
    return this.apiService.post('auth/reset-senha', payload);
  }
}
