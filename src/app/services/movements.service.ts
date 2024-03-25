import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { GetMovementsFilter, GetMovementsResponse, Movement } from '../models/movements.model';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  constructor(private _api : ApiService) { }

  CreateMovement(movement: Movement){
    return this._api.post('Movements', movement);
  }

  GetMovements(filter: GetMovementsFilter): Observable<Result<GetMovementsResponse[]>> {

    let params = new HttpParams();

    Object.keys(filter).forEach(key => {
      if (filter[key as keyof GetMovementsFilter] !== undefined && filter[key as keyof GetMovementsFilter] !== null) {
        params = params.set(key, filter[key as keyof GetMovementsFilter]!.toString());
      }
    });

    return this._api.get<any>('Movements', params);
  }
  
}
