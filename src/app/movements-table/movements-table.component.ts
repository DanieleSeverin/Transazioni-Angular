import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MovementsService } from '../services/movements.service';
import { Observable, Subscription, map, shareReplay } from 'rxjs';
import { GetMovementsFilter, GetMovementsResponse } from '../models/movements.model';
import { AccountsService } from '../services/accounts.service';
import { Account } from '../models/accounts.model';
import { Pagination, PaginationResponse } from '../models/pagination';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sorting } from '../models/Sorting';
import { Result } from '../models/result.model';

@Component({
  selector: 'app-movements-table',
  templateUrl: './movements-table.component.html',
  styleUrls: ['./movements-table.component.scss']
})
export class MovementsTableComponent implements OnInit, AfterViewInit, OnDestroy {

  DESCRIPTION_MAX_LENGTH = 60;

  filters: GetMovementsFilter = {
    originAccountId: '' ,
    destinationAccountId: ''
  };
  pagination : Pagination = {
    pageNumber: 1,
    pageSize: 10
  };
  sorting : Sorting = {
    orderBy: 'date',
    ascending: false
  };

  movements$? :Observable<Result<PaginationResponse<GetMovementsResponse>>>;
  accounts$?  :Observable<Account[]>;

  displayedColumns: string[] = ['date', 'description', 'money', 'currency', 'account', 
    'destinationAccount', 'category', 'isImported', 'peridiocity'];

  @ViewChild(MatSort) sort!: MatSort;
  sortSubscription? : Subscription;

  constructor(private _movements : MovementsService,
              private _accounts : AccountsService) { }

  ngOnInit(): void {
    this.fetchMovements();
    this.fetchAccounts();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(event => {
      this.sorting.orderBy = event.active;
      this.sorting.ascending = event.direction === 'asc';
      this.fetchMovements();
    });
  }

  ngOnDestroy() {
    this.sortSubscription?.unsubscribe();
  }

  fetchMovements() {
    this.movements$ = this._movements.GetMovements(this.filters, this.pagination, this.sorting)
      .pipe(
        shareReplay(1)
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
