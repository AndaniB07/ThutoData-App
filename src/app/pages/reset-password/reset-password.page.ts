import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  IonContent,
  IonIcon
} from '@ionic/angular';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,

  imports: [
    FormsModule,
    RouterLink,
    IonContent,
    IonIcon,
    CommonModule
  ],

  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss']
})
export class ResetPasswordPage implements OnInit {

  email = '';
  token = '';

  newPassword = '';
  confirmPassword = '';

  showPassword = false;
  showConfirmPassword = false;

  errorMessage = '';
  successMessage = '';

  loading = false;

  private apiUrl =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {

      this.token =
        params.get('token') || '';

      this.email =
        params.get('email') || '';

      if (!this.token || !this.email) {
        this.errorMessage =
          'This password reset link is invalid or incomplete.';
      }

    });

  }

  resetPassword(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (!this.token || !this.email) {
      this.errorMessage =
        'This password reset link is invalid or incomplete.';
      return;
    }

    if (!this.newPassword || !this.confirmPassword) {
      this.errorMessage =
        'Please enter and confirm your new password.';
      return;
    }

    if (this.newPassword.length < 8) {
      this.errorMessage =
        'Password must be at least 8 characters long.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage =
        'Passwords do not match.';
      return;
    }

    if (this.loading) {
      return;
    }

    this.loading = true;

    this.http.post<any>(
      `${this.apiUrl}/Auth/reset-password`,
      {
        email: this.email,
        token: this.token,
        newPassword: this.newPassword
      }
    )
    .subscribe({

      next: (response) => {

        this.loading = false;

        this.successMessage =
          'Your password has been reset successfully.';

        this.newPassword = '';
        this.confirmPassword = '';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);

      },

      error: (error) => {

        console.error(
          'Reset password error:',
          error
        );

        this.loading = false;

        if (error.status === 400) {

          this.errorMessage =
            error.error?.message ||
            'This password reset link is invalid or expired.';

        }
        else if (error.status === 0) {

          this.errorMessage =
            'Unable to connect to the server. Please try again later.';

        }
        else {

          this.errorMessage =
            'Something went wrong. Please try again.';

        }

      }

    });

  }

  togglePassword(): void {

    this.showPassword =
      !this.showPassword;

  }

  toggleConfirmPassword(): void {

    this.showConfirmPassword =
      !this.showConfirmPassword;

  }

}