import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportMovementsComponent } from './import-movements/import-movements.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { MovementsTableComponent } from './movements-table/movements-table.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'Login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'import', component: ImportMovementsComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddComponent, canActivate: [AuthGuard] },
  { path: 'movements', component: MovementsTableComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
