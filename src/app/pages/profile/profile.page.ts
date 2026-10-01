import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  IonContent,
  ViewWillEnter
} from '@ionic/angular';

import {
  Auth,
  User
} from '../../services/auth';

import {
  SavedService
} from '../../services/saved.service';

@Component({
  selector: 'app-profile',
  standalone: true,

  imports: [
    CommonModule,
    IonContent
  ],

  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit, ViewWillEnter {

  // =========================================
  // USER
  // =========================================

  user: User | null = null;


  // =========================================
  // SAVED INFORMATION
  // =========================================

  savedUniversities = 0;

  savedCourses = 0;


  // =========================================
  // LOADING
  // =========================================

  loadingSavedInformation = true;


  // =========================================
  // CONSTRUCTOR
  // =========================================

  constructor(
    private auth: Auth,
    private savedService: SavedService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  // =========================================
  // INITIALISE
  // =========================================

  ngOnInit(): void {

    console.log(
      '========== PROFILE PAGE =========='
    );

    this.loadUser();

  }

  ionViewWillEnter(): void {

  if (this.user) {
    this.loadSavedInformation();
  }

  }


  // =========================================
  // LOAD USER
  // =========================================

  loadUser(): void {

    console.log(
      'Loading logged-in user...'
    );

    const loggedInUser =
      this.auth.getUser();

    const token =
      this.auth.getToken();


    console.log(
      'USER:',
      loggedInUser
    );

    console.log(
      'TOKEN EXISTS:',
      !!token
    );


    // -----------------------------------------
    // USER NOT LOGGED IN
    // -----------------------------------------

    if (!loggedInUser || !token) {

      console.log(
        'No logged-in user found.'
      );

      this.router.navigate([
        '/login'
      ]);

      return;
    }


    // -----------------------------------------
    // USER FOUND
    // -----------------------------------------

    this.user =
      loggedInUser;


    console.log(
      'Logged-in user:',
      this.user
    );


    this.loadSavedInformation();

  }


  // =========================================
  // LOAD SAVED INFORMATION
  // =========================================

  loadSavedInformation(): void {

    console.log(
      'Loading saved universities and courses...'
    );


    this.loadingSavedInformation =
      true;


    // -----------------------------------------
    // SAVED UNIVERSITIES
    // -----------------------------------------

    this.savedService
      .getSavedUniversities()
      .subscribe({

        next: (data) => {

          console.log(
            'SAVED UNIVERSITIES:',
            data
          );


          if (Array.isArray(data)) {

            this.savedUniversities =
              data.length;

          } else {

            this.savedUniversities =
              0;

          }


          console.log(
            'SAVED UNIVERSITY COUNT:',
            this.savedUniversities
          );

        },

        error: (error) => {

          console.error(
            'Error loading saved universities:',
            error
          );

          this.savedUniversities =
            0;

        }

      });


    // -----------------------------------------
    // SAVED COURSES
    // -----------------------------------------

    this.savedService
      .getSavedCourses()
      .subscribe({

        next: (data) => {

          console.log(
            'SAVED COURSES:',
            data
          );


          if (Array.isArray(data)) {

            this.savedCourses =
              data.length;

          } else {

            this.savedCourses =
              0;

          }


          console.log(
            'SAVED COURSE COUNT:',
            this.savedCourses
          );


          this.loadingSavedInformation =
            false;

          this.refreshPage();

        },

        

        error: (error) => {

          console.error(
            'Error loading saved courses:',
            error
          );

          this.savedCourses =
            0;

          this.loadingSavedInformation =
            false;

          this.refreshPage();

        }

      });

  }


    // =========================================
  // FORCE PAGE REFRESH
  // =========================================

  private refreshPage(): void {

    setTimeout(() => {

      this.cdr.detectChanges();

    });

  }

  // =========================================
  // VIEW UNIVERSITIES
  // =========================================

  viewUniversities(): void {
  console.log('Opening saved universities...');

  this.router.navigate([
    '/tabs/saved-universities'
  ]);
}


  // =========================================
  // VIEW COURSES
  // =========================================

  viewCourses(): void {
  console.log('Opening saved courses...');

  this.router.navigate([
    '/tabs/saved-courses'
  ]);
}


  // =========================================
  // EDIT PROFILE
  // =========================================

  editProfile(): void {

    console.log(
      'Edit profile clicked.'
    );

    /*
     * We will build the Edit Profile
     * page after the main logged-in
     * experience is working.
     */

  }


  // =========================================
  // SETTINGS
  // =========================================

  openSettings(): void {

    console.log(
      'Settings clicked.'
    );

    /*
     * Settings page can be added later.
     */

  }


  // =========================================
  // APPLICATIONS
  // =========================================

  viewApplications(): void {

    console.log(
      'Applications clicked.'
    );

  }


  // =========================================
  // DEADLINES
  // =========================================

  viewDeadlines(): void {

    console.log(
      'Deadlines clicked.'
    );

  }


  // =========================================
  // LOGOUT
  // =========================================

  logout(): void {

    console.log(
      '========== LOGGING OUT =========='
    );


    this.auth.logout();


    this.user = null;


    console.log(
      'User session cleared.'
    );


    this.router.navigate([
      '/login'
    ]);

  }

}