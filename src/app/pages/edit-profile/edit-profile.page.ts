import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  IonContent
} from '@ionic/angular';

import {
  Auth,
  User
} from '../../services/auth';

import {
  AccessibilityControlsComponent
} from '../../components/accessibility-controls/accessibility-controls.component';

@Component({
  selector: 'app-edit-profile',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    AccessibilityControlsComponent
  ],

  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss']
})
export class EditProfilePage implements OnInit {

  user: User | null = null;

  name = '';
  email = '';
  grade: number | null = null;

  saving = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {

    const loggedInUser = this.auth.getUser();

    const token = this.auth.getToken();

    if (!loggedInUser || !token) {

      this.router.navigate(['/login']);

      return;
    }

    this.user = loggedInUser;

    this.name = loggedInUser.name;
    this.email = loggedInUser.email;
    this.grade = loggedInUser.grade;
  }


  // =========================================
  // SAVE PROFILE
  // =========================================

saveProfile(): void {

  this.errorMessage = '';
  this.successMessage = '';

  // Basic validation
  if (!this.name.trim()) {
    this.errorMessage =
      'Please enter your full name.';
    return;
  }

  if (!this.email.trim()) {
    this.errorMessage =
      'Please enter your email address.';
    return;
  }

  if (!this.user) {
    this.errorMessage =
      'Your account could not be found.';
    return;
  }

  this.saving = true;

  this.auth
    .updateProfile(
      this.user.userID,
      this.name,
      this.email,
      this.grade
    )
    .subscribe({

      next: (response) => {

        console.log(
          'Profile successfully updated:',
          response
        );

        // Update the saved user information
        this.user = response.user;

        this.name = response.user.name;
        this.email = response.user.email;
        this.grade = response.user.grade;

        this.successMessage =
          'Your profile has been updated successfully.';

        this.saving = false;

        // Give the success message a moment to appear,
        // then return to the Profile page.

        setTimeout(() => {

  this.router.navigate([
    '/tabs/profile'
  ]);

}, 1000);
      },

      error: (error) => {

        console.error(
          'Profile update failed:',
          error
        );

        this.saving = false;

        this.errorMessage =
          error?.error?.message ??
          'Unable to update your profile. Please try again.';
      }

    });
}

  // =========================================
  // CANCEL
  // =========================================

  cancel(): void {

    this.router.navigate([
      '/tabs/profile'
    ]);

  }

}