import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImportMovementsComponent } from './import-movements/import-movements.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { ImportBoxComponent } from './import-movements/import-box/import-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAccountDialogComponent } from './create-account-dialog/create-account-dialog.component';
import { LoadingSpinnerInterceptor } from './interceptors/loading-spinner.interceptor';
import { SpinnerComponent } from './spinner/spinner.component';
import { ShellComponent } from './shell/shell.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { CreateMovementDialogComponent } from './create-movement-dialog/create-movement-dialog.component';
import { CreateRuleDialogComponent } from './create-rule-dialog/create-rule-dialog.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { PieComponent } from './charts/pie/pie.component';
import { MovementsTableComponent } from './movements-table/movements-table.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { AccountsBalanceComponent } from './home/accounts-balance/accounts-balance.component';
import { RevenueComponent } from './home/revenue/revenue.component';
import { CostsComponent } from './home/costs/costs.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { BarchartComponent } from './charts/barchart/barchart.component';

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
    CreateRuleDialogComponent,
    PieComponent,
    MovementsTableComponent,
    TruncatePipe,
    AccountsBalanceComponent,
    RevenueComponent,
    CostsComponent,
    LoginComponent,
    RegisterComponent,
    BarchartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingSpinnerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
