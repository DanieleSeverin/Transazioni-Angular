import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInUserRequest } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup;

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  constructor(private _formBuilder: FormBuilder, 
              private _auth : AuthService,
              private _router : Router) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    const logInUserRequest : LogInUserRequest = {
      email: this.email?.value,
      password: this.password?.value
    };

    console.log('Login attempt: ', logInUserRequest);

    this._auth.login(logInUserRequest).subscribe({
      next: () => {
        console.log('Login successful');
        this._router.navigate(['']);
      },
      error: (error) => {
        console.error('Login error!', error);
      }
    });
  }

}
