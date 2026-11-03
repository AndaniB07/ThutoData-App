
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  IonContent,
  IonIcon
} from '@ionic/angular';

import { Auth } from '../../services/auth';
import { AccessibilityControlsComponent } from '../../components/accessibility-controls/accessibility-controls.component';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    FormsModule,
    RouterLink,
    IonContent,
    IonIcon,
    CommonModule,
    AccessibilityControlsComponent
  ],

  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {

  email = '';

  password = '';

  showPassword = false;

  errorMessage = '';

  loading = false;


  constructor(
    private auth: Auth,
    private router: Router,
    private toastService: ToastService
  ) {}


  // =========================================
  // LOGIN
  // =========================================

  login(): void {

    this.errorMessage = '';


    // Validate fields

    if (
      !this.email.trim() ||
      !this.password
    ) {

      this.errorMessage =
        'Please enter your email and password.';

      this.toastService.error(this.errorMessage);

      return;

    }


    // Prevent multiple clicks

    if (this.loading) {

      return;

    }


    this.loading = true;


    // =========================================
    // CALL BACKEND
    // =========================================

    this.auth
      .login(
        this.email,
        this.password
      )
      .subscribe({

        // =====================================
        // LOGIN SUCCESS
        // =====================================

        next: (response) => {

          console.log(
            'Login response received:',
            response
          );


          this.loading = false;

          this.toastService.success(
            'Welcome back! You have logged in successfully.'
          );


          // Navigate ONLY after the user
          // has been saved by Auth.login()

          this.router.navigate(['/tabs/home']);

        },


        // =====================================
        // LOGIN ERROR
        // =====================================

        error: (error) => {

          console.error(
            'Login error:',
            error
          );


          this.loading = false;


          if (
            error.status === 401
          ) {

            this.errorMessage =
              'Incorrect email or password. Please check your details and try again.';

          }

          else if (
            error.status === 0
          ) {

            this.errorMessage =
              'Unable to connect to the server. Please make sure the backend is running.';

          }

          else {

            this.errorMessage =
              'Something went wrong. Please try again.';

          }

          this.toastService.error(this.errorMessage);

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

}
