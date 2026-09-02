import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import {
  IonContent,
  IonIcon
} from '@ionic/angular';

import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonIcon,
    RouterLink
  ],

  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss']
})
export class SignUpPage {

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';

  showPassword = false;
  showConfirmPassword = false;

  errorMessage = '';
  successMessage = '';
  loading = false;


  constructor(
    private auth: Auth,
    private router: Router
  ) {}


  // =========================================
  // REGISTER
  // =========================================

  register(): void {

    this.errorMessage = '';
    this.successMessage = '';


    // Check required fields
    if (
      !this.firstName.trim() ||
      !this.lastName.trim() ||
      !this.email.trim() ||
      !this.password ||
      !this.confirmPassword
    ) {

      this.errorMessage =
        'Please complete all fields.';

      return;
    }


    // Check passwords
    if (
      this.password !==
      this.confirmPassword
    ) {

      this.errorMessage =
        'Passwords do not match.';

      return;
    }


    // Basic password check
    if (this.password.length < 6) {

      this.errorMessage =
        'Password must be at least 6 characters long.';

      return;
    }


    this.loading = true;


    // Combine first and last name
    const fullName =
      `${this.firstName.trim()} ${this.lastName.trim()}`;


    // Send registration to backend
    this.auth.register(
      fullName,
      this.email,
      this.password,
      null
    )
    .subscribe({

      next: (response) => {

        console.log(
          'Registration successful:',
          response
        );

        this.loading = false;

        this.successMessage =
          'Account created successfully! Redirecting to login...';


        // Give user a moment to see success message
        setTimeout(() => {

          this.router.navigate(['/login']);

        }, 1200);

      },


      error: (error) => {

        console.error(
          'Registration error:',
          error
        );

        this.loading = false;


        if (
          error?.error?.message
        ) {

          this.errorMessage =
            error.error.message;

        } else {

          this.errorMessage =
            'Unable to create your account. Please try again.';

        }

      }

    });

  }


  // =========================================
  // SHOW / HIDE PASSWORD
  // =========================================

  togglePassword(): void {

    this.showPassword =
      !this.showPassword;

  }


  toggleConfirmPassword(): void {

    this.showConfirmPassword =
      !this.showConfirmPassword;

  }

}