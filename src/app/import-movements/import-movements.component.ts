import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../services/accounts.service';
import { Account, CreateAccountRequest } from '../models/accounts.model';
import { ImportService } from '../services/import.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateAccountDialogComponent } from '../create-account-dialog/create-account-dialog.component';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-import-movements',
  templateUrl: './import-movements.component.html',
  styleUrls: ['./import-movements.component.scss']
})
export class ImportMovementsComponent implements OnInit {

  uploadedFile: File | null = null;

  dataSources = ["CheBanca", "Fideuram", "Paypal", "Satispay", "Santander"];
  accounts :Account[] = [];

  form = this._formBuilder.group({
    dataSource : ['', [Validators.required]],
    account: ['', [Validators.required]],
  });

  get dataSource() { return this.form.get('dataSource'); }
  get account() { return this.form.get('account'); }

  dialogRef : MatDialogRef<CreateAccountDialogComponent> | null = null;

  constructor(private _accounts: AccountsService,
              private _import : ImportService,
              private _formBuilder: FormBuilder,
              private _dialog: MatDialog,
              private _notifier: NotificationService) { }

  ngOnInit(): void {
    this.GetAccounts();
  }

  GetAccounts(){
    this._accounts.GetAccounts(true).subscribe({
      next: data => {
        this.accounts = data.value;
      },
      error: error => {
        console.error(error);
      }
    })
  }

  openCreateNewAccountDialog(){
    this.dialogRef = this._dialog.open(CreateAccountDialogComponent, {
      minWidth: '40vw'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed. Result: ', result);
      this.dialogRef = null;

      if(result){
        this.CreateAccount(result);
      }
    });
  }

  CreateAccount(account : CreateAccountRequest){
    if(!account){
      return;
    }

    this._accounts.CreateAccount(account).subscribe({
      next: data => {
        console.log(data);
        this.accounts = [data.value, ...this.accounts];
        this.account?.setValue(data.value.accountName);
        this.uploadedFile = null;
        this._notifier.showSuccess('Account created successfully');
      },
      error: error => {
        console.error(error);
        this._notifier.showError(error?.name ?? 'Error creating account');
      }
    });
  }

  onFileSelected(file: File) {
    this.uploadedFile = file;
  }

  sendFile(){
    if(!this.uploadedFile){
      return;
    }

    if(!this.dataSource){
      return;
    }

    if(!this.account){
      return;
    }

    this._import.importFile(this.uploadedFile, this.dataSource.value, this.account.value).subscribe({
      next: data => {
        this._notifier.showSuccess('Movements imported successfully');
        console.log(data);
        this.uploadedFile = null;
        this.form.reset();
      },
      error: error => {
        this._notifier.showError('Error importing movements');
        console.error(error);
      }
    });
  }

}
