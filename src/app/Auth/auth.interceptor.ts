import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger
    // Only add auth token to Firebase requests
    if (!req.url.includes('firebaseio.com')) {
      return next.handle(req);
    }

    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user || !user.token) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          url: `${req.url}?auth=${user.token}`
        });
        console.log(modifiedReq);

        return next.handle(modifiedReq);
      })
    );
  }
}