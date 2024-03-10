import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Peridiocity } from '../models/peridiocity.enum';
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

  accounts$: Observable<Account[]>;

  categories : any[] = []; // TODO
  peridiocities = Object.values(Peridiocity);

  form = this._formBuilder.group({
    accountId : ['', [Validators.required] ],
    destinationAccountId : ['', [Validators.required] ],
    date: [new Date(), [Validators.required] ],
    description : ['', [Validators.required] ],
    amount: [0, [Validators.required] ],
    currency: ['EUR', [Validators.required] ],
    category: [''],
    peridiocity: [Peridiocity.None, [Validators.required] ],
  });

  get accountId() { return this.form.get('accountId'); }
  get destinationAccountId() { return this.form.get('destinationAccountId'); }
  get date() { return this.form.get('date'); }
  get description() { return this.form.get('description'); }
  get amount() { return this.form.get('amount'); }
  get currency() { return this.form.get('currency'); }
  get category() { return this.form.get('category'); }
  get peridiocity() { return this.form.get('peridiocity'); }

  constructor(public dialogRef: MatDialogRef<CreateMovementDialogComponent>,
              private _formBuilder : FormBuilder,
              private _notifier: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: { accounts$ : Observable<Result<Account[]>> } ) 
  {
    this.accounts$ = data.accounts$.pipe(
      shareReplay(1),
      map( response => response.value),
      catchError(err => {
        console.error(err);
        this._notifier.showError(err.error.name ?? 'Error loading accounts');
        return of([]);
    })
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
      peridiocity: this.peridiocity?.value
    };

    if(movement.accountId === movement.destinationAccountId){
      this._notifier.showError('Account and destination account must be different');
      return;
    }

    this.dialogRef.close(movement);
  }
}
