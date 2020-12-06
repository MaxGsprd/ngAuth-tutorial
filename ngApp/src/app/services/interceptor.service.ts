import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private _authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) :
  Observable<HttpEvent<any>> {
    let tokenizedRequest = req.clone({ // create a clone of the request
      setHeaders: {
        Authorization: `Bearer ${this._authService.getToken()}`
      }
    });
    return next.handle(tokenizedRequest);
  }
}
