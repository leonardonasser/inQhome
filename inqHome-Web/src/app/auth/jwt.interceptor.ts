import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentUser;

    const isOurApi = request.url.startsWith(environment.apiUrl);

    if (isOurApi && currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${currentUser.token}`
        }
      });
    }

    return next.handle(request);
  }
}
