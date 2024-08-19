import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  
    private isRefreshing = false;

    constructor(private _auth : AuthService, private _router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

        if(!request.url.startsWith(environment.apiUrl)) {
            return next.handle(request);
        }

        return next.handle(request).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse && !request.url.includes('auth/Login') && error.status === 401) {
                return this.handle401Error(request, next);
                }
        
                return throwError(() => error);
            })
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;

            if (this._auth.isLoggedIn()) {
                return this._auth.refreshJwt().pipe(
                    switchMap(() => {
                        this.isRefreshing = false;

                        return next.handle(request);
                    }),
                    catchError((error) => {
                        this.isRefreshing = false;

                        this._auth.logout();
                        this._router.navigate(['/Login']);

                        return throwError(() => error);
                    })
                );
            }
        }

        return next.handle(request);
    }
}
