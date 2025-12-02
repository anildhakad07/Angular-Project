import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  mobileNumber: string = '';
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

    const navState = history.state;
    this.mobileNumber = navState.mobileNumber;

    if (!this.mobileNumber) {
      alert('Invalid request! Mobile number missing.');
      this.router.navigate(['/forgot-password']);
    }
  }

  resetPassword() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    const req = {
      userName: this.mobileNumber,
      newPassword: this.resetForm.value.newPassword,
    };

    this.loginService.resetPassword(req).subscribe({
      next: (res) => {
        if (res.isSuccessful) {
          alert(res.message);
          this.router.navigate(['/login']);
        } else {
          alert(res.message);
        }
      },
      error: () => {
        alert('Server error! Please try again later.');
      },
    });
  }

  get newPassword() {
    return this.resetForm.get('newPassword');
  }
}
