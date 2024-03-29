import { Component, OnInit } from '@angular/core';
import { MovementsService } from '../services/movements.service';
import { Observable, map, shareReplay, tap } from 'rxjs';
import { GetMovementsFilter, GetMovementsResponse } from '../models/movements.model';
import { AccountsService } from '../services/accounts.service';
import { Account } from '../models/accounts.model';
import { Pagination } from '../models/pagination';
import { PageEvent } from '@angular/material/paginator';

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
  pagination : Pagination = {
    pageNumber: 1,
    pageSize: 10
  };
  movementsCount : number = 0;
  movements$? :Observable<GetMovementsResponse[]>;
  accounts$?  :Observable<Account[]>;

  displayedColumns: string[] = ['date', 'description', 'amount', 'currency', 'originAccount', 
    'destinationAccount', 'category', 'isImported', 'peridiocity'];

  constructor(private _movements : MovementsService,
              private _accounts : AccountsService) { }

  ngOnInit(): void {
    this.fetchMovements();
    this.fetchAccounts();
  }

  fetchMovements() {
    this.movements$ = this._movements.GetMovements(this.filters, this.pagination)
      .pipe(
        tap(x => this.movementsCount = x.value.count),
        map(x => x.value.list)
      );
  }

  fetchAccounts() {
    this.accounts$ = this._accounts.GetAccounts()
      .pipe(
        shareReplay(1),
        map(x => x.value)
      );
  }

  onPageChange(event : PageEvent){
    this.pagination.pageNumber = event.pageIndex + 1;
    this.pagination.pageSize = event.pageSize;
    this.fetchMovements();
  }

}
