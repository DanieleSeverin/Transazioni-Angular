import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _auth : AuthService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) 
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const isLoggedIn = this._auth.isLoggedIn();

      if(isLoggedIn) return true;

      this._auth.logout().subscribe({
        next: () => {
          console.log('Activated Auth Guard, user logged out.');
        },
        error: () => {
          console.error('Activated Auth Guard, error logging out user.');
        },
        complete: () => {
          this._router.navigate(['/Login']);
        }
      });

      return false;
  }
  
}
