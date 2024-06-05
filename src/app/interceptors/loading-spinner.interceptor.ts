import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class LoadingSpinnerInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService, private notifier : NotificationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Show spinner when request starts
    // Need to use setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.spinnerService.show();
    }, 0);

    return next.handle(request).pipe(
      tap((event) => {
        // Hide spinner when request is completed successfully
        if (event instanceof HttpResponse) {
          this.spinnerService.hide();
        }
      }),
      catchError((error) => {
        this.notifier.showHttpError(error);
        // Hide spinner when request encounters an error
        this.spinnerService.hide();
        throw error;
      })
    );
  }
}
