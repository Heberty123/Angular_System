import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnInit } from '@angular/core';
import { MaterialBasicModule } from 'src/app/shared/modules/material-basic.module';
import { DetailsComponent } from '../../customer/screens/details/details.component';
import { ListModule } from '../../customer/screens/list/list.module';
import { RegisterComponent } from '../../customer/screens/register/register.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth-service';
import { LoginService } from 'src/app/shared/resources/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  standalone: true,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    MaterialBasicModule,
    ListModule, 
    ReactiveFormsModule
  ],
  providers: [],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  fb = inject(FormBuilder);
  loginService = inject(LoginService);
  authService = inject(AuthService);
  route = inject(Router);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  onSubmit(): void {
    if (this.form.valid) {
      this.loginService.login(this.form.getRawValue())
        .subscribe((response) => {
          localStorage.setItem('token', response.token);
          this.authService.currentUserSig.set(response);
          this.route.navigateByUrl("/home");
        })
    }
  }

}
