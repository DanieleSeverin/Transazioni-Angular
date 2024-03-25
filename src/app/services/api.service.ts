import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  get<TResponse>(url: string, params? : HttpParams) :Observable<TResponse> {
    return this._http.get<TResponse>(`${environment.apiUrl}/${url}`, { params });
  }

  post<TRequest, TResponse>(url: string, data: TRequest) :Observable<TResponse> {
    return this._http.post<TResponse>(`${environment.apiUrl}/${url}`, data);
  }

  put<TRequest, TResponse>(url: string, data: TRequest) :Observable<TResponse> {
    return this._http.put<TResponse>(`${environment.apiUrl}/${url}`, data);
  }

  delete<TResponse>(url: string) :Observable<TResponse> {
    return this._http.delete<TResponse>(`${environment.apiUrl}/${url}`);
  }

}
