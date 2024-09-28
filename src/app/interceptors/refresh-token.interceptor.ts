import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError, switchMap, forkJoin } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../services/auth.service";

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private requestQueue: HttpRequest<any>[] = [];

    constructor(private _auth: AuthService, private _router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

        if (!request.url.startsWith(environment.apiUrl)) {
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

    private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;

            // Queue the current request
            this.requestQueue.push(request);

            return this._auth.refreshJwt().pipe(
                switchMap(() => {
                    this.isRefreshing = false;

                    // Retry all the queued requests after token refresh
                    const retryRequests = this.requestQueue.map(req => next.handle(req));
                    this.requestQueue = []; // Clear the queue

                    return forkJoin(retryRequests);
                }),
                catchError((error) => {
                    this.isRefreshing = false;

                    console.error('Error handle401Error', error);
                    // On error, clear the queue and navigate to login
                    this._auth.logout();
                    this._router.navigate(['/Login']);
                    this.requestQueue = [];

                    return throwError(() => error);
                })
            );
        } else {
            // If already refreshing, queue the request and return an empty observable that will be retried later
            return new Observable(observer => {
                this.requestQueue.push(request);
            });
        }
    }
}
