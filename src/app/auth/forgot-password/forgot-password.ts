import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ForgotPasswordRequest, LoginService } from '../../services/login-service';
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css'],
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    this.forgotForm = this.fb.group({
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
    });
  }

  get mobileNumber() {
    return this.forgotForm.get('mobileNumber');
  }

  onSubmit() {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const request: ForgotPasswordRequest = {
      mobileNumber: this.mobileNumber?.value.trim(),
    };

    this.loginService.forgotPassword(request).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.isSuccessful) {
          localStorage.setItem('forgotMobile', this.mobileNumber?.value);
          alert(res.message);
          this.router.navigate(['/otp-verify']);
        } else {
          alert(res.message);
        }
      },
      error: (err) => {
        this.loading = false;
        alert(err?.error?.message || 'Server error, try again later');
        console.error(err);
      },
    });
  }
}
