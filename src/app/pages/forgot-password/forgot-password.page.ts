import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  IonContent,
  IonIcon
} from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  standalone: true,

  imports: [
    FormsModule,
    RouterLink,
    IonContent,
    IonIcon,
    CommonModule
  ],

  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss']
})
export class ForgotPasswordPage {

  email = '';

  errorMessage = '';

  successMessage = '';

  loading = false;


  private apiUrl =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api';


  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


  // =========================================
  // SEND RESET EMAIL
  // =========================================

  sendResetLink(): void {

    this.errorMessage = '';
    this.successMessage = '';


    if (!this.email.trim()) {

      this.errorMessage =
        'Please enter your email address.';

      return;

    }


    if (this.loading) {

      return;

    }


    this.loading = true;


   this.http.post<any>(
  `${this.apiUrl}/Auth/forgot-password`,
  {
    email: this.email.trim()
  }
)
.pipe(
  timeout(15000)
)
    .subscribe({

      next: (response) => {

        this.loading = false;

        this.successMessage =
          'If an account exists for that email, a password reset link has been sent.';

      },

      error: (error) => {

        console.error(
          'Forgot password error:',
          error
        );

        this.loading = false;

        if (error.status === 0) {

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

}