import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateAccountRequest } from '../models/accounts.model';

@Component({
  selector: 'app-create-account-dialog',
  templateUrl: './create-account-dialog.component.html',
  styleUrls: ['./create-account-dialog.component.scss']
})
export class CreateAccountDialogComponent {

  form = this._formBuilder.group({
    accountName : ['', [Validators.required]],
    isPatrimonial : [false, [Validators.required]],
  });

  get accountName() { return this.form.get('accountName'); }
  get isPatrimonial() { return this.form.get('isPatrimonial'); }

  constructor(public dialogRef: MatDialogRef<CreateAccountDialogComponent>,
              private _formBuilder : FormBuilder) { }

  save(){
    const account :CreateAccountRequest = {
      accountName: this.accountName?.value,
      isPatrimonial: this.isPatrimonial?.value
    };

    this.dialogRef.close(account);
  }
}
