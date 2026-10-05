import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


import {
  IonContent,
  ViewWillEnter,
    IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle
} from '@ionic/angular';

import {
  Auth,
  User
} from '../../services/auth';

import {
  SavedService
} from '../../services/saved.service';

import {
  AccessibilityControlsComponent
} from '../../components/accessibility-controls/accessibility-controls.component';


@Component({
  selector: 'app-profile',
  standalone: true,

  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    AccessibilityControlsComponent
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
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}


  // =========================================
  // INITIALISE
  // =========================================

 ngOnInit(): void {

  console.log(
    '========== PROFILE PAGE INITIALISED =========='
  );

  this.auth.user$.subscribe(user => {

    console.log(
      'PROFILE: User changed:',
      user
    );

    this.user = user;

    this.cdr.detectChanges();

  });

}


  // =========================================
  // PAGE ENTER
  // =========================================

  ionViewWillEnter(): void {

  console.log(
    '========== PROFILE PAGE ENTERED =========='
  );

  const navigation =
    this.router.getCurrentNavigation();

  const updatedUser =
    navigation?.extras?.state?.['updatedUser'];

  if (updatedUser) {

    console.log(
      'PROFILE: Received updated user:',
      updatedUser
    );

    this.user = updatedUser;

    this.cdr.detectChanges();

    this.loadSavedInformation();

    return;
  }

  this.loadUser();
}


  // =========================================
  // LOAD USER
  // =========================================

  loadUser(): void {

    console.log(
      'PROFILE: Loading logged-in user...'
    );


    const loggedInUser =
      this.auth.getUser();


    const token =
      this.auth.getToken();


    console.log(
      'PROFILE: USER:',
      loggedInUser
    );


    console.log(
      'PROFILE: TOKEN EXISTS:',
      !!token
    );


    // -----------------------------------------
    // USER NOT LOGGED IN
    // -----------------------------------------

    if (!loggedInUser || !token) {

      console.log(
        'PROFILE: No logged-in user found.'
      );


      this.user = null;


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
      'PROFILE: User loaded successfully:',
      this.user
    );


    // Force Angular to update the profile
    // immediately after assigning the user.
    this.cdr.detectChanges();


    // Load saved information separately.
    this.loadSavedInformation();

  }


  // =========================================
  // LOAD SAVED INFORMATION
  // =========================================

  loadSavedInformation(): void {

    console.log(
      'PROFILE: Loading saved universities and courses...'
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
            'PROFILE: SAVED UNIVERSITIES:',
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
            'PROFILE: SAVED UNIVERSITY COUNT:',
            this.savedUniversities
          );


          this.refreshPage();

        },


        error: (error) => {

          console.error(
            'PROFILE: Error loading saved universities:',
            error
          );


          this.savedUniversities =
            0;


          this.refreshPage();

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
            'PROFILE: SAVED COURSES:',
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
            'PROFILE: SAVED COURSE COUNT:',
            this.savedCourses
          );


          this.loadingSavedInformation =
            false;


          this.refreshPage();

        },


        error: (error) => {

          console.error(
            'PROFILE: Error loading saved courses:',
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

    console.log(
      'Opening saved universities...'
    );


    this.router.navigate([
      '/tabs/saved-universities'
    ]);

  }


  // =========================================
  // VIEW COURSES
  // =========================================

  viewCourses(): void {

    console.log(
      'Opening saved courses...'
    );


    this.router.navigate([
      '/tabs/saved-courses'
    ]);

  }


  // =========================================
  // EDIT PROFILE
  // =========================================

  editProfile(): void {

    console.log(
      'Opening edit profile...'
    );


    this.router.navigate([
      '/edit-profile'
    ]);

  }


  // =========================================
  // SETTINGS
  // =========================================

  openSettings(): void {

    console.log(
      'Settings clicked.'
    );

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