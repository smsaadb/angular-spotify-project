import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InterceptTokenService implements HttpInterceptor {
  constructor(private a: AuthService) {}

  /**
   * This adds extra stuff to all ongoing HTTP requests.
   * In our case, we are adding { Authorization: `JWT ${this.a.getToken() }` }
   * to the header of requests to our own user api, and not on spotify stuff.
   */

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.includes('spotify.com')) {
      request = request.clone({
        setHeaders: {
          Authorization: `JWT ${this.a.getToken()}`,
        },
      });
    }

    return next.handle(request);
  }
}
