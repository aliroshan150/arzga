import {Inject, Injectable, Optional} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable, tap, throwError} from 'rxjs';
import {API_URL, LOGGER_URL} from '../arzga-core.module';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class ArzgaInterceptorBaseClass implements HttpInterceptor {

  constructor(
    @Inject(API_URL) protected apiUrl: string,
    @Inject(LOGGER_URL) protected loggerUrl: string,
    @Optional() protected http: HttpClient,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiReq = req;
    if (!req.headers.get('skip') && this.apiUrl) {
      apiReq = req.clone({url: `${this.apiUrl}/${req.url}`});
    }

    this.logApi({
      url: req.url,
      time: new Date(),
      method: req.method,
      status: 'StartApiCall'
    });
    return next
      .handle(apiReq)
      .pipe(
        tap(() => {
          this.logApi({
            url: req.url,
            time: new Date(),
            method: req.method,
            status: 'EndApiCall'
          });
        }),
        catchError((error: HttpErrorResponse) => {
          if (this.loggerUrl) {
            if (req.url !== this.loggerUrl) {
              this.logError(error);
            }
          } else {
            console.error('Arzga Developer Mode:', error);
          }
          // return throwError({message: error.message, status: error.status});
          return throwError(() => ({error: error.error, message: error.message, status: error.status}));
          // return throwError(error);
        }),
      );

  }

  private logError(log: HttpErrorResponse) {
    //TODO: handle logg error
    // this.http.post(this.loggerUrl, log, {
    //     observe: 'response',
    //     responseType: 'json',
    //     headers: {skip: 'true'},
    // }).subscribe(
    //     value => {
    //     },
    //     error => {
    //     },
    // );
  }

  private logApi(apiCall: {
    method: string,
    url: string,
    time: Date,
    status: 'StartApiCall' | 'EndApiCall'
  }) {
    // console.log(`${apiCall.method} Api call with URL: ${apiCall.url}\n${(apiCall.status === 'StartApiCall') ? 'Started At: ' : 'Ended At: '}\n${apiCall.time}`);
  }
}
