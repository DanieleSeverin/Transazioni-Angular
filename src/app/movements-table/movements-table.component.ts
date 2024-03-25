import { Component, OnInit } from '@angular/core';
import { MovementsService } from '../services/movements.service';
import { Observable } from 'rxjs';
import { GetMovementsResponse } from '../models/movements.model';
import { Result } from '../models/result.model';

@Component({
  selector: 'app-movements-table',
  templateUrl: './movements-table.component.html',
  styleUrls: ['./movements-table.component.scss']
})
export class MovementsTableComponent implements OnInit {

  movements$ :Observable<Result<GetMovementsResponse[]>> = this._movements.GetMovements({});

  displayedColumns: string[] = ['date', 'description', 'amount', 'currency', 'originAccount', 
    'destinationAccount', 'category', 'isImported', 'peridiocity'];

  constructor(private _movements : MovementsService) { }

  ngOnInit(): void {
  }

}
