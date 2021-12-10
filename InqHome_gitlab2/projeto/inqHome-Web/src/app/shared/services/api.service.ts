import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export enum ErrorCode {
  ValidationError = 'VALIDATION_ERROR',
  FormValidationError = 'FORM_VALIDATION_ERROR',
  UnexpectedError = 'UNEXPECTED_ERROR',
  Unauthorized = 'UNAUTHORIZED',
}

export interface ApiError {
  message: string;
  code: ErrorCode;
  errors: {
    field?: string,
    message: string
  }[];
}

export interface ServiceError {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      return throwError(`Error: ${error.error.message}`);
    }

    // Server-side errors
    if (error.status === 0) {
      return throwError({ message: 'Servidor indisponível' });
    }

    const apiError: ApiError | null = error.error;

    const serviceError: ServiceError = {
      message: apiError?.message || 'Ocorreu um erro inesperado',
    };

    return throwError(serviceError);
  }

  private createHttpParams(params: any): HttpParams {
    return Object.entries<any>(params)
      .filter(([_param, value]) => value != null)
      .reduce((accHttpParams: HttpParams, [param, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item => {
            accHttpParams = accHttpParams.append(param, item);
          });

          return accHttpParams;
        }

        return accHttpParams.set(param, value);
      }, new HttpParams());
  }

  public get<T>(url: string, params = {}) {
    return this.httpClient
      .get<T>(`${environment.apiUrl}/${url}`, {params: this.createHttpParams(params)})
      .pipe(catchError(error => this.handleError(error)));
  }

  public post<T>(url: string, payload?: any) {
    return this.httpClient
      .post<T>(`${environment.apiUrl}/${url}`, payload)
      .pipe(catchError(error => this.handleError(error)));
  }

  public put<T>(url: string, payload?: any) {
    return this.httpClient
      .put<T>(`${environment.apiUrl}/${url}`, payload)
      .pipe(catchError(error => this.handleError(error)));
  }

  public delete(url: string, params = {}) {
    return this.httpClient
      .delete(`${environment.apiUrl}/${url}`, {params: this.createHttpParams(params)})
      .pipe(catchError(error => this.handleError(error)));
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.httpClient.get(`${environment.apiUrl}/storage/${imageUrl}`, { responseType: 'blob' });
  }

}
