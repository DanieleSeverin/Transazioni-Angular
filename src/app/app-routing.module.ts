import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportMovementsComponent } from './import-movements/import-movements.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { MovementsTableComponent } from './movements-table/movements-table.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'import', component: ImportMovementsComponent },
  { path: 'add', component: AddComponent },
  { path: 'movements', component: MovementsTableComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
