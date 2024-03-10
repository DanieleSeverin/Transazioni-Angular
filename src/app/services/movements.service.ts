import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Movement } from '../models/movements.model';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  constructor(private _api : ApiService) { }

  CreateMovement(movement: Movement){
    return this._api.post('Movements', movement);
  }
  
}
