import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  IonContent,
  IonIcon,
  ViewWillEnter
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  schoolOutline,
  trashOutline,
  chevronForwardOutline
} from 'ionicons/icons';

import { SavedService } from '../services/saved.service';

@Component({
  selector: 'app-saved-courses',
  standalone: true,
  templateUrl: './saved-courses.page.html',
  styleUrls: ['./saved-courses.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonIcon
  ]
})
export class SavedCoursesPage implements OnInit, ViewWillEnter {

  savedCourses: any[] = [];

  loading = true;

  hasLoaded = false;

  error = false;

  removingCourseId: number | null = null;

  constructor(
    private savedService: SavedService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {

    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'school-outline': schoolOutline,
      'trash-outline': trashOutline,
      'chevron-forward-outline': chevronForwardOutline
    });

  }

  ngOnInit(): void {

    console.log(
      '========== SAVED COURSES PAGE =========='
    );

    this.loadSavedCourses();

  }

  ionViewWillEnter(): void {

    console.log(
      '========== SAVED COURSES PAGE (VIEW WILL ENTER) =========='
    );


    if (this.hasLoaded) {
      this.loadSavedCourses();
    }

  }

  loadSavedCourses(): void {

    console.log(
      'Loading saved courses...'
    );

    this.loading = true;
    this.error = false;

    this.savedService.getSavedCourses().subscribe({

      next: (data) => {

        console.log(
          'SAVED COURSES:',
          data
        );

        if (Array.isArray(data)) {

          this.savedCourses = data;

        } else {

          this.savedCourses = [];

        }

        console.log(
          'NUMBER OF SAVED COURSES:',
          this.savedCourses.length
        );

        this.loading = false;

        this.hasLoaded = true;

        this.refreshPage();

        console.log(
          'LOADING:',
          this.loading
        );

      },

      error: (error) => {

        console.error(
          'ERROR LOADING SAVED COURSES:',
          error
        );

        this.savedCourses = [];

        this.loading = false;

        this.error = true;

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

  removeCourse(courseId: number): void {

    if (
      this.removingCourseId !== null
    ) {
      return;
    }

    console.log(
      'Removing saved course:',
      courseId
    );

    this.removingCourseId =
      courseId;

    this.savedService
      .removeCourse(courseId)
      .subscribe({

        next: () => {

          console.log(
            'Course removed successfully:',
            courseId
          );

          this.savedCourses =
            this.savedCourses.filter(
              course =>
                this.getCourseId(course) !== courseId
            );

          this.removingCourseId =
            null;

          this.refreshPage();

        },

        error: (error) => {

          console.error(
            'ERROR REMOVING COURSE:',
            error
          );

          this.removingCourseId =
            null;

        }

      });

  }

  getCourseId(course: any): number {

    return Number(

      course?.courseID ??

      course?.CourseID ??

      course?.courseId ??

      course?.CourseId ??

      course?.course?.courseID ??

      course?.Course?.courseID ??

      course?.Course?.CourseID

    );

  }

  getCourseName(course: any): string {

    return (

      course?.courseName ??

      course?.CourseName ??

      course?.name ??

      course?.Name ??

      course?.course?.courseName ??

      course?.Course?.courseName ??

      course?.Course?.Name ??

      'Course'

    );

  }

  getQualification(course: any): string {

    return (

      course?.qualification ??

      course?.Qualification ??

      course?.course?.qualification ??

      course?.Course?.qualification ??

      course?.Course?.Qualification ??

      ''

    );

  }

  getUniversityName(course: any): string {

    return (

      course?.universityName ??

      course?.UniversityName ??

      course?.university?.universityName ??

      course?.University?.universityName ??

      course?.University?.Name ??

      ''

    );

  }

  openCourse(course: any): void {

    const courseId =
      this.getCourseId(course);

    if (!courseId) {

      console.error(
        'Could not determine course ID.'
      );

      return;

    }

    console.log(
      'Opening course:',
      courseId
    );

    /*
     * We have not created a dedicated
     * course-details page yet.
     *
     * For now, take the user back
     * to the universities/courses area.
     */

    this.router.navigate([
      '/tabs/universities'
    ]);

  }

  goBack(): void {

    this.router.navigate([
      '/tabs/profile'
    ]);

  }

  goToCourses(): void {

    this.router.navigate([
      '/tabs/universities'
    ]);

  }

}