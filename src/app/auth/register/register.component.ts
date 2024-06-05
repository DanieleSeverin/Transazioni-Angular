import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserRequest } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  registerForm!: FormGroup;

  get email() { return this.registerForm.get('email'); }
  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get password() { return this.registerForm.get('password'); }

  constructor(private _formBuilder: FormBuilder, 
              private _auth : AuthService,
              private _notifier : NotificationService,
              private _router : Router
            ) { }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm(): void {
    this.registerForm = this._formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register(): void {
    const registerUserRequest : RegisterUserRequest = {
      email: this.email?.value,
      firstName: this.firstName?.value,
      lastName: this.lastName?.value,
      password: this.password?.value
    };

    this._auth.register(registerUserRequest).subscribe({
      next: () => {
        console.log('register successful');
        this._notifier.showSuccess('User registered successfully');
        this._router.navigate(['/login']);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

}
