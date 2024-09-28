import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  isMenuOpen: boolean = false;
  isSmallScreen: boolean = false;

  isLoggedIn: boolean;

  constructor(public _auth : AuthService,
              private _router : Router)
  {
    this.checkScreenSize();
    this.isLoggedIn = this._auth.isLoggedIn();
  }

  ngOnInit(){
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeSubMenu() {
    this.isMenuOpen = false;
  }

  logout(){
    this._auth.logout().subscribe({
      next: () => {
        console.log('User logged out successfully');
        this._router.navigate(['/Login']);
      },
      error: (error) => {
        console.error('Error logging out user', error);
      }
    });
  }
}
