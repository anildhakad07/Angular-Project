import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './otp-verification.html',
  styleUrls: ['./otp-verification.css'],
})
export class OtpVerificationComponent implements OnInit {
  otpForm: FormGroup;
  countdown = 30;
  interval: any;
  mobileNumber: string = '';

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    this.otpForm = this.fb.group({
      d1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      d2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      d3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      d4: ['', [Validators.required, Validators.pattern('[0-9]')]],
      d5: ['', [Validators.required, Validators.pattern('[0-9]')]],
      d6: ['', [Validators.required, Validators.pattern('[0-9]')]],
    });
  }

  ngOnInit() {
    const navState = history.state;
    this.mobileNumber = navState.mobileNumber || '';
    this.startTimer();
  }

  startTimer() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.countdown > 0) this.countdown--;
      else clearInterval(this.interval);
    }, 1000);
  }

  resendOtp() {
    this.countdown = 30;
    this.startTimer();

    this.loginService
      .forgotPassword({ mobileNumber: this.mobileNumber })
      .subscribe({
        next: (res) => alert(res.message),
        error: () => alert('Error resending OTP'),
      });
  }

  onKeyUp(event: any, index: number) {
    const inputs = this.otpInputs.toArray();
    const input = event.target;

    if (input.value.length > 1) {
      input.value = input.value.slice(0, 1);
    }

    if (input.value && index < inputs.length - 1) {
      inputs[index + 1].nativeElement.focus();
    }

    if (event.key === 'Backspace' && index > 0 && !input.value) {
      inputs[index - 1].nativeElement.focus();
    }
  }

  verifyOtp() {
    if (!this.otpForm.valid) {
      this.otpForm.markAllAsTouched();
      return;
    }

    const otp = Object.values(this.otpForm.value).join('');

    this.loginService
      .verifyOtp({
        mobileNumber: this.mobileNumber,
        otp,
      })
      .subscribe({
        next: (res) => {
          if (res.isSuccessful) {
            this.router.navigate(['/reset-password'], {
              state: { mobileNumber: this.mobileNumber },
            });
          } else {
            alert(res.message);
          }
        },
        error: () => alert('Server error'),
      });
  }
}
