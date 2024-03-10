import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImportMovementsComponent } from './import-movements/import-movements.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { ImportBoxComponent } from './import-movements/import-box/import-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAccountDialogComponent } from './create-account-dialog/create-account-dialog.component';
import { LoadingSpinnerInterceptor } from './interceptors/loading-spinner.interceptor';
import { SpinnerComponent } from './spinner/spinner.component';
import { ShellComponent } from './shell/shell.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { CreateMovementDialogComponent } from './create-movement-dialog/create-movement-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ImportMovementsComponent,
    ImportBoxComponent,
    CreateAccountDialogComponent,
    SpinnerComponent,
    ShellComponent,
    NavbarComponent,
    HomeComponent,
    AddComponent,
    CreateMovementDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingSpinnerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
