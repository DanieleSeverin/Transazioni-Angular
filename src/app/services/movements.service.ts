import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { GetMovementsFilter, GetMovementsResponse, Movement } from '../models/movements.model';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Result } from '../models/result.model';
import { Pagination, PaginationResponse } from '../models/pagination';
import { Sorting } from '../models/Sorting';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  constructor(private _api : ApiService) { }

  CreateMovement(movement: Movement){
    return this._api.post('Movements', movement);
  }

  GetMovements(filters: GetMovementsFilter, pagination : Pagination, sorting : Sorting) 
    : Observable<Result<PaginationResponse<GetMovementsResponse>>> 
  {
    let params = new HttpParams();

    const queryParams = {...filters, ...pagination, ...sorting};

    Object.keys(queryParams).forEach(key => {
      if (this.shouldAddParam(queryParams, key)) {
        params = params.set(key, queryParams[key as keyof GetMovementsFilter]!.toString());
      }
    });

    return this._api.get<Result<PaginationResponse<GetMovementsResponse>>>('Movements', params);
  }

  private shouldAddParam(queryParams: any, key : string) : boolean {
    return queryParams[key as keyof GetMovementsFilter] !== undefined && 
      queryParams[key as keyof GetMovementsFilter] !== null &&
      queryParams[key as keyof GetMovementsFilter] !== '';
  }
  
}
