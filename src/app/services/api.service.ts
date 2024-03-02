import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  get(url: string) :Observable<any> {
    return this._http.get(`${environment.apiUrl}/${url}`);
  }

  post(url: string, data: any) :Observable<any> {
    return this._http.post(`${environment.apiUrl}/${url}`, data);
  }

  put(url: string, data: any) :Observable<any> {
    return this._http.put(`${environment.apiUrl}/${url}`, data);
  }

  delete(url: string) :Observable<any> {
    return this._http.delete(`${environment.apiUrl}/${url}`);
  }

}
