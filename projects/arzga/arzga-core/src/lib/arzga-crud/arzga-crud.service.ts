import {Injectable, Optional} from '@angular/core';
import {ArzgaCoreService} from "../arzga-core/arzga-core.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {getApiPathById} from "../class";

const serialize = (obj: any) => {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + obj[p]);
    }
  }
  return str.join('&');
};

@Injectable({
  providedIn: 'root',
})
export abstract class ArzgaCrudService extends ArzgaCoreService {

  @Optional()
  abstract entityName: string;

  protected constructor(protected http: HttpClient) {
    super(http);
  }

  save = <T, D>(dto: D, options: any): Observable<T> => this.post<T, D>(this.entityName, dto, options);

  update = <T, D>(dto: D, options: any): Observable<T> => this.put(this.entityName, dto, options);

  getById = <T>(id: number | string, options?: any): Observable<T> => this.get<T>(`${this.entityName}/${id}`, options);

  deleteByIdWithPathParam = <T>(id: number | string, options: any): Observable<T> => this.delete(this.entityName + '/' + id, options);

  deleteByIdWithQueryParam = <T>(id: number | string, options: any): Observable<T> => this.delete(this.entityName + '?id=' + id, options);

  customDelete = <T, D>(dto: D, options: any): Observable<T> => this.deleteByData(this.entityName, dto, options);

}
