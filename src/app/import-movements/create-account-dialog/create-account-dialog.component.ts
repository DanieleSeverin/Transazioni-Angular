import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-account-dialog',
  templateUrl: './create-account-dialog.component.html',
  styleUrls: ['./create-account-dialog.component.scss']
})
export class CreateAccountDialogComponent {

  form = this._formBuilder.group({
    accountName : ['', [Validators.required]],
  });

  get accountName() { return this.form.get('accountName'); }

  constructor(public dialogRef: MatDialogRef<CreateAccountDialogComponent>,
              private _formBuilder : FormBuilder) { }

  save(){
    this.dialogRef.close(this.accountName?.value);
  }
}
