import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../services/notification.service';
import { Observable, catchError, map, of } from 'rxjs';
import { Result } from '../models/result.model';
import { Account } from '../models/accounts.model';
import { AccountRule } from '../models/account-rule.model';

@Component({
  selector: 'app-create-rule-dialog',
  templateUrl: './create-rule-dialog.component.html',
  styleUrls: ['./create-rule-dialog.component.scss']
})
export class CreateRuleDialogComponent {

  accounts$: Observable<Account[]>;

  form = this._formBuilder.group({
    accountId : ['', [Validators.required] ],
    query : ['', [Validators.required] ],
  });

  get accountId() { return this.form.get('accountId'); }
  get query() { return this.form.get('query'); }
  
  constructor(public dialogRef: MatDialogRef<CreateRuleDialogComponent>,
              private _formBuilder : FormBuilder,
              private _notifier: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: { accounts$ : Observable<Result<Account[]>> } ) 
    { 
      this.accounts$ = data.accounts$.pipe(
        map( response => response.value),
        catchError(err => {
          console.error(err);
          this._notifier.showError(err.error.name ?? 'Error loading accounts');
          return of([]);
        })
      );
    }

    save(){
      const rule : AccountRule = {
        accountId: this.accountId?.value,
        query: this.query?.value
      }
  
      this.dialogRef.close(rule);
    }

}
