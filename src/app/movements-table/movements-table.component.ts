import { Component, OnInit } from '@angular/core';
import { MovementsService } from '../services/movements.service';
import { Observable, shareReplay } from 'rxjs';
import { GetMovementsFilter, GetMovementsResponse } from '../models/movements.model';
import { Result } from '../models/result.model';
import { AccountsService } from '../services/accounts.service';
import { Account } from '../models/accounts.model';

@Component({
  selector: 'app-movements-table',
  templateUrl: './movements-table.component.html',
  styleUrls: ['./movements-table.component.scss']
})
export class MovementsTableComponent implements OnInit {

  filters: GetMovementsFilter = {
    originAccountId: '' ,
    destinationAccountId: ''

  };
  movements$? :Observable<Result<GetMovementsResponse[]>>;
  accounts$?  :Observable<Result<Account[]>>;

  displayedColumns: string[] = ['date', 'description', 'amount', 'currency', 'originAccount', 
    'destinationAccount', 'category', 'isImported', 'peridiocity'];

  constructor(private _movements : MovementsService,
              private _accounts : AccountsService) { }

  ngOnInit(): void {
    this.fetchMovements();
    this.fetchAccounts();
  }

  fetchMovements() {
    this.movements$ = this._movements.GetMovements(this.filters);
  }

  fetchAccounts() {
    this.accounts$ = this._accounts.GetAccounts()
      .pipe(
        shareReplay(1)
      );
  }

}
