import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import socialIcons from './../../../assets/data/pages/social-items.json';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  templateUrl: './login-1.component.html',
  providers: [AuthenticationService],
})
export class Login1Component {
  loginForm: FormGroup;
  isLoading = false;
  error = false;
  socialMediaButtons = socialIcons.socialMediaButtons;

  validateForm!: UntypedFormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private authenticationService: AuthenticationService
  ) {}

  submitForm(): void {
    const formData = this.validateForm.value;
    console.log('h', formData);
    const data = {
      email: formData.userName,
      motDePasse: formData.password,
    };
    if (this.validateForm.valid) {
      this.authenticationService.login(data).subscribe((response: any) => {
        console.log(response);

        this.router.navigate(['/dashboard/demo-one']).then(() => {
          console.log('submit', this.validateForm.value);
          window.location.reload();
        });
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  passwordVisible = false;
  password?: string;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true],
    });
  }
}
