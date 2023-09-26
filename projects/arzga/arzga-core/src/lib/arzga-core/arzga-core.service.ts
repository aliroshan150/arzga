import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})

export abstract class ArzgaCoreService {

  protected constructor(protected _http: HttpClient) {
  }

  getByResponse = <ResponseGenericType>(url: string, options?: any): Observable<HttpResponse<ResponseGenericType>> => {

    options = options || {};
    options.observe = options.observe || 'response';
    options.responseType = options.responseType || 'json';

    return this._http.get<ResponseGenericType>(url, options)
      .pipe(
        map(response => response as HttpResponse<ResponseGenericType>)
      );

  };

  get = <ResponseGenericType>(url: string, options?: any): Observable<ResponseGenericType> => {

    options = options || {};
    options.observe = 'response';
    options.responseType = 'json';

    return this._http.get<ResponseGenericType>(url, options,
    ).pipe(
      map(response => (<HttpResponse<ResponseGenericType>>response).body!)
    );

  };

  putByResponse = <ResponseGenericType, D>(url: string, dto: D, options?: any): Observable<HttpResponse<ResponseGenericType>> => {

    options = options || {};
    options.observe = options.observe || 'response';
    options.responseType = options.responseType || 'json';

    return this._http.put<ResponseGenericType>(url, dto, options)
      .pipe(
        map(response => response as HttpResponse<ResponseGenericType>)
      );

  };

  put = <ResponseGenericType, D>(url: string, dto: D, options?: any): Observable<any> => {

    options = options || {};
    options.observe = options.observe || 'response';
    options.responseType = options.responseType || 'json';

    return this._http.put<ResponseGenericType>(url, dto, options,
    ).pipe(
      map(response => (<HttpResponse<ResponseGenericType>>response).body!)
    );

  };

  patchByResponse = <ResponseGenericType, D>(url: string, dto: D, options?: any): Observable<HttpResponse<ResponseGenericType>> => {

    options = options || {};
    options.observe = options.observe || 'response';
    options.responseType = options.responseType || 'json';

    return this._http.patch<ResponseGenericType>(url, dto, options)
      .pipe(
        map(response => response as HttpResponse<ResponseGenericType>)
      );

  };

  patch = <ResponseGenericType, D>(url: string, dto: D, options?: any): Observable<any> => {

    options = options || {};
    options.observe = options.observe || 'response';
    options.responseType = options.responseType || 'json';

    return this._http.patch<ResponseGenericType>(url, dto, options,
    ).pipe(
      map(response => (<HttpResponse<ResponseGenericType>>response).body!)
    );

  };

  postByResponse = <ResponseGenericType, D>(url: string, dto: D, options?: any): Observable<HttpResponse<ResponseGenericType>> => {

    options = options || {};
    options.observe = options.observe || 'response';
    options.responseType = options.responseType || 'json';

    return this._http.post<ResponseGenericType>(url, dto, options)
      .pipe(
        map(response => response as HttpResponse<ResponseGenericType>)
      );

  };

  post = <ResponseGenericType, D>(url: string, dto: D, options?: any): Observable<ResponseGenericType> => {

    options = options || {};
    options.observe = options.observe || 'response';
    options.responseType = options.responseType || 'json';

    return this._http.post<ResponseGenericType>(url, dto, options).pipe(
      map(response => (<HttpResponse<ResponseGenericType>>response).body!)
    );

  };

  delete = <ResponseGenericType>(url: string, options?: any): Observable<ResponseGenericType> => {

    options = options || {};
    options.observe = options.observe || 'response';
    options.responseType = options.responseType || 'json';

    return this._http.delete<ResponseGenericType>(url, options,
    ).pipe(
      map(response => (<HttpResponse<ResponseGenericType>>response).body!)
    );

  };

  deleteByData = <ResponseGenericType, D>(url: string, dto: D, options?: any): Observable<ResponseGenericType> => {

    options = options || {};
    options.observe = options.observe || 'response';
    options.responseType = options.responseType || 'json';

    return this._http.delete<ResponseGenericType>(url, {
        body: dto,
        ...options
      },
    ).pipe(
      map(response => (<HttpResponse<ResponseGenericType>>response).body!)
    );

  };

}
