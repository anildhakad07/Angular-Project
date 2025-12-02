import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface ForgotPasswordRequest {
  mobileNumber: string;
}

export interface OtpVerifyRequest {
  mobileNumber: string;
  otp: string;
}

export interface ResetPasswordRequest {
  userName: string;
  newPassword: string;
}

export interface ResultWithDataDTO<T> {
  isSuccessful: boolean;
  message: string;
  data: T | null;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'https://localhost:44329/api/Auth';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<ResultWithDataDTO<string>> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      map((res) => ({
        isSuccessful: res.isSuccessful,
        message: res.message,
        data: res.data,
      }))
    );
  }

  register(credentials: LoginRequest): Observable<ResultWithDataDTO<string>> {
    return this.http.post<any>(`${this.baseUrl}/register`, credentials).pipe(
      map((res) => ({
        isSuccessful: res.isSuccessful,
        message: res.message,
        data: res.data,
      }))
    );
  }

  forgotPassword(
    request: ForgotPasswordRequest
  ): Observable<ResultWithDataDTO<string>> {
    return this.http.post<any>(`${this.baseUrl}/forgot-password`, request).pipe(
      map((res) => ({
        isSuccessful: res.isSuccessful,
        message: res.message,
        data: res.data,
      }))
    );
  }

  verifyOtp(request: OtpVerifyRequest): Observable<ResultWithDataDTO<string>> {
    return this.http.post<any>(`${this.baseUrl}/verify-otp`, request).pipe(
      map((res) => ({
        isSuccessful: res.isSuccessful,
        message: res.message,
        data: res.data,
      }))
    );
  }

  resetPassword(
    request: ResetPasswordRequest
  ): Observable<ResultWithDataDTO<string>> {
    return this.http.post<any>(`${this.baseUrl}/reset-password`, request).pipe(
      map((res) => ({
        isSuccessful: res.isSuccessful,
        message: res.message,
        data: res.data,
      }))
    );
  }

  setToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  logout() {
    localStorage.removeItem('jwtToken');
  }
}
