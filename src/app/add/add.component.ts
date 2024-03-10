import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateAccountDialogComponent } from '../create-account-dialog/create-account-dialog.component';
import { AccountsService } from '../services/accounts.service';
import { NotificationService } from '../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateMovementDialogComponent } from '../create-movement-dialog/create-movement-dialog.component';
import { Movement } from '../models/movements.model';
import { MovementsService } from '../services/movements.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  dialogRef : MatDialogRef<any> | null = null;

  constructor(private _accounts: AccountsService, 
              private _movements : MovementsService,
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
        this._notifier.showHttpError(error, 'Error creating account');
      }
    });
  }

  openCreateNewMovementDialog(){
    this.dialogRef = this._dialog.open(CreateMovementDialogComponent, {
      minWidth: '40vw',
      data: {
        accounts$: this._accounts.GetAccounts()
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed. Result: ', result);
      this.dialogRef = null;

      if(result){
        this.CreateMovement(result);
      }
    });
  }

  CreateMovement(movement: Movement){
    console.log(movement);

    this._movements.CreateMovement(movement).subscribe({
      next: data => {
        console.log(data);
        this._notifier.showSuccess('Movement created successfully');
      },
      error: (error : HttpErrorResponse) => {
        console.error(error);
        this._notifier.showHttpError(error, 'Error creating movement');
      }
    });
    
  }

}
