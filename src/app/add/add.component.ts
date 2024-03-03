import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateAccountDialogComponent } from '../create-account-dialog/create-account-dialog.component';
import { AccountsService } from '../services/accounts.service';
import { NotificationService } from '../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  dialogRef : MatDialogRef<any> | null = null;

  constructor(private _accounts: AccountsService, 
              private _dialog: MatDialog,
              private _notifier: NotificationService) { }

  ngOnInit(): void {
  }

  openCreateNewAccountDialog(){
    this.dialogRef = this._dialog.open(CreateAccountDialogComponent, {
      minWidth: '40vw'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed. Result: ', result);
      this.dialogRef = null;

      if(result){
        this.CreatePatrimonialAccount(result);
      }
    });
  }

  CreatePatrimonialAccount(accountName : string){
    if(!accountName){
      return;
    }

    this._accounts.CreatePatrimonialAccount(accountName).subscribe({
      next: data => {
        console.log(data);
        this._notifier.showSuccess('Account created successfully');
      },
      error: (error : HttpErrorResponse) => {
        console.error(error);
        console.error(error.error.name);
        console.error(error?.name);
        this._notifier.showError(error?.error?.name ?? 'Error creating account');
      }
    });
  }

}
