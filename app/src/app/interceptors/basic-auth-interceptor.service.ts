import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import 'rxjs';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class BasicAuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const uuid = this.authService.getUUID();
    const token = this.authService.UserToken.getValue();

    const header = `${uuid}:${token}`;
    const base64Header = btoa(header);

    if (uuid && token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Basic ${base64Header}`
        }
      });
    }

    //If error 401, redirect to /login
    return next.handle(req).pipe(tap(() => {}, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
          return;
        } 
        this.router.navigate(['login']);
      }
    }))
  }
}
