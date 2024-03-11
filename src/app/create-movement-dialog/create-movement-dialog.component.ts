import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Periodicity } from '../models/periodicity.enum';
import { Movement } from '../models/movements.model';
import { NotificationService } from '../services/notification.service';
import { Account } from '../models/accounts.model';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';
import { Result } from '../models/result.model';

@Component({
  selector: 'app-create-movement-dialog',
  templateUrl: './create-movement-dialog.component.html',
  styleUrls: ['./create-movement-dialog.component.scss']
})
export class CreateMovementDialogComponent {

  patrimonialAccounts$: Observable<Account[]>;
  economicAccounts$: Observable<Account[]>;

  categories : any[] = []; // TODO
  peridiocities = Object.values(Periodicity);

  form = this._formBuilder.group({
    accountId : ['', [Validators.required] ],
    destinationAccountId : ['', [Validators.required] ],
    date: [new Date(), [Validators.required] ],
    description : ['', [Validators.required] ],
    amount: [0, [Validators.required] ],
    currency: ['EUR', [Validators.required] ],
    category: [''],
    periodicity: [this.peridiocities[0], [Validators.required] ],
  });

  get accountId() { return this.form.get('accountId'); }
  get destinationAccountId() { return this.form.get('destinationAccountId'); }
  get date() { return this.form.get('date'); }
  get description() { return this.form.get('description'); }
  get amount() { return this.form.get('amount'); }
  get currency() { return this.form.get('currency'); }
  get category() { return this.form.get('category'); }
  get periodicity() { return this.form.get('periodicity'); }

  constructor(public dialogRef: MatDialogRef<CreateMovementDialogComponent>,
              private _formBuilder : FormBuilder,
              private _notifier: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: { accounts$ : Observable<Result<Account[]>> } ) 
  {
    const accountsValue$ = data.accounts$.pipe(
      shareReplay(1),
      map( response => response.value),
      catchError(err => {
        console.error(err);
        this._notifier.showError(err.error.name ?? 'Error loading accounts');
        return of([]);
      })
    );
    
    this.patrimonialAccounts$ = accountsValue$.pipe(
      map( accounts => accounts.filter(account => account.isPatrimonial)),
    );

    this.economicAccounts$ = accountsValue$.pipe(
      map( accounts => accounts.filter(account => !account.isPatrimonial)),
    );
  }

  save(){
    const movement :Movement = {
      accountId: this.accountId?.value,
      destinationAccountId: this.destinationAccountId?.value,
      date: this.date?.value,
      description: this.description?.value,
      amount: this.amount?.value,
      currency: this.currency?.value,
      category: this.category?.value,
      periodicity: this.periodicity?.value
    };

    if(movement.accountId === movement.destinationAccountId){
      this._notifier.showError('Account and destination account must be different');
      return;
    }

    this.dialogRef.close(movement);
  }
}
