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

      // Riassunto problema:
      // al momento questo isLoggedIn viene riempito facendo una chiamata al server
      // (vedi AppComponent.initializeApp() e AuthService.askServerIfLoggedIn()).
      // Ovviamente il server ci mette qualche istante a rispondere, di conseguenza
      // quando si refresha la pagina questa variabile isLoggedIn è ancora false 
      // e l'utente viene reindirizzato alla pagina di login.
      // Soluzione: al login (e probabilmente al refresh) il server deve restituire un oggetto
      // con le informazioni sui token, tra cui sicuramente la data di scadenza.
      // Salvarci questa data di scadenza in local storage. 
      // _auth.isLoggedIn() deve controllare la data in localstorage e restituire true se il token è ancora valido.
      // _auth.logout() deve cancellare la data di scadenza dal local storage.
      console.log('AuthGuard. Is logged in: ', isLoggedIn);

      if(isLoggedIn) return true;

      this._router.navigate(['/Login']);
      return false;
  }
  
}
