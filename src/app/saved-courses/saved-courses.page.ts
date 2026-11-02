import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {
  IonContent,
  IonIcon,
  IonSpinner,
  ViewWillEnter
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  bookmarkOutline,
  bookOutline,
  schoolOutline,
  businessOutline,
  chevronForwardOutline,
  trashOutline,
  searchOutline,
  alertCircleOutline
} from 'ionicons/icons';

import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SavedService } from '../services/saved.service';
import { AccessibilityControlsComponent } from '../components/accessibility-controls/accessibility-controls.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-saved-courses',
  standalone: true,
  templateUrl: './saved-courses.page.html',
  styleUrls: ['./saved-courses.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    IonSpinner,
    AccessibilityControlsComponent,
    FooterComponent
  ]
})
export class SavedCoursesPage implements OnInit, ViewWillEnter {

  private readonly courseOfferingsApi =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/CourseOfferings';

  private readonly universitiesApi =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/Universities';

  private readonly facultiesApi =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/Faculties';

  savedCourses: any[] = [];

  loading = true;

  hasLoaded = false;

  error = false;

  removingCourseId: number | null = null;

  constructor(
    private savedService: SavedService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {

    addIcons({
      arrowBackOutline,
      bookmarkOutline,
      bookOutline,
      schoolOutline,
      businessOutline,
      chevronForwardOutline,
      trashOutline,
      searchOutline,
      alertCircleOutline
    });

  }

  ngOnInit(): void {

    console.log('========== SAVED COURSES PAGE ==========');

    this.loadSavedCourses();

  }

  ionViewWillEnter(): void {

    console.log('========== SAVED COURSES PAGE (VIEW WILL ENTER) ==========');

    if (this.hasLoaded) {
      this.loadSavedCourses();
    }

  }

  // =========================================
  // LOAD SAVED COURSES
  // =========================================

  loadSavedCourses(): void {

    console.log('Loading saved courses...');

    this.loading = true;
    this.error = false;

    this.savedService.getSavedCourses().subscribe({

      next: (data) => {

        console.log(
          'SAVED COURSES:',
          JSON.stringify(data, null, 2)
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

        // Fetch institution and faculty information.
        this.loadCourseInformation();

      },

      error: (error) => {

        console.error('ERROR LOADING SAVED COURSES:', error);

        this.savedCourses = [];

        this.loading = false;
        this.error = true;

        this.refreshPage();

      }

    });

  }

  // =========================================
  // LOAD INSTITUTIONS AND FACULTIES
  // =========================================

  private loadCourseInformation(): void {

    forkJoin({

      offerings: this.http.get<any>(this.courseOfferingsApi).pipe(
        catchError(error => {
          console.error('ERROR LOADING COURSE OFFERINGS:', error);
          return of([]);
        })
      ),

      universities: this.http.get<any>(this.universitiesApi).pipe(
        catchError(error => {
          console.error('ERROR LOADING UNIVERSITIES:', error);
          return of([]);
        })
      ),

      faculties: this.http.get<any>(this.facultiesApi).pipe(
        catchError(error => {
          console.error('ERROR LOADING FACULTIES:', error);
          return of([]);
        })
      )

    }).subscribe({

      next: (data) => {

        const offerings = this.getArray(data.offerings);
        const universities = this.getArray(data.universities);
        const faculties = this.getArray(data.faculties);

        console.log('COURSE OFFERINGS:', offerings);
        console.log('UNIVERSITIES:', universities);
        console.log('FACULTIES:', faculties);

        // Enrich each saved course with its institution information.
        this.savedCourses = this.savedCourses.map(course => {

          const courseId = this.getCourseId(course);

          const matchingOfferings = offerings.filter(
            offering =>
              Number(
                offering?.courseID ??
                offering?.CourseID
              ) === courseId
          );

          const institutions = matchingOfferings.map(offering => {

            const universityId =
              offering?.universityID ??
              offering?.UniversityID;

            const facultyId =
              offering?.facultyID ??
              offering?.FacultyID;

            const university = universities.find(
              item =>
                Number(
                  item?.universityID ??
                  item?.UniversityID
                ) === Number(universityId)
            );

            const faculty = faculties.find(
              item =>
                Number(
                  item?.facultyID ??
                  item?.FacultyID
                ) === Number(facultyId)
            );

            return {
              universityName:
                university?.universityName ??
                university?.UniversityName ??
                university?.name ??
                university?.Name ??
                offering?.university?.universityName ??
                offering?.University?.UniversityName ??
                '',

              facultyName:
                faculty?.facultyName ??
                faculty?.FacultyName ??
                faculty?.name ??
                faculty?.Name ??
                offering?.faculty?.facultyName ??
                offering?.Faculty?.FacultyName ??
                ''
            };

          });

          // Remove duplicate institution and faculty names.
          const universityNames = [
            ...new Set(
              institutions
                .map(item => item.universityName)
                .filter(name => name)
            )
          ];

          const facultyNames = [
            ...new Set(
              institutions
                .map(item => item.facultyName)
                .filter(name => name)
            )
          ];

          return {
            ...course,
            _institutionNames: universityNames,
            _facultyNames: facultyNames
          };

        });

        console.log(
          'ENRICHED SAVED COURSES:',
          this.savedCourses
        );

        this.loading = false;
        this.hasLoaded = true;

        this.refreshPage();

      },

      error: (error) => {

        console.error('ERROR ENRICHING SAVED COURSES:', error);

        this.loading = false;
        this.hasLoaded = true;

        this.refreshPage();

      }

    });

  }

  // Handles both normal arrays and common API response wrappers.
  private getArray(data: any): any[] {

    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data?.$values)) {
      return data.$values;
    }

    if (Array.isArray(data?.data)) {
      return data.data;
    }

    return [];

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
  // REMOVE SAVED COURSE
  // =========================================

  removeCourse(courseId: number): void {

    if (this.removingCourseId !== null) {
      return;
    }

    console.log('Removing saved course:', courseId);

    this.removingCourseId = courseId;

    this.savedService
      .removeCourse(courseId)
      .subscribe({

        next: () => {

          console.log('Course removed successfully:', courseId);

          this.savedCourses = this.savedCourses.filter(
            course => this.getCourseId(course) !== courseId
          );

          this.removingCourseId = null;

          this.refreshPage();

        },

        error: (error) => {

          console.error('ERROR REMOVING COURSE:', error);

          this.removingCourseId = null;

        }

      });

  }

  // =========================================
  // COURSE INFORMATION HELPERS
  // =========================================

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
      course?.qualificationType ??
      course?.QualificationType ??
      course?.qualification ??
      course?.Qualification ??
      course?.course?.qualificationType ??
      ''
    );

  }

  getAcademicField(course: any): string {

    return (
      course?.academicField ??
      course?.AcademicField ??
      course?.course?.academicField ??
      course?.course?.AcademicField ??
      'Not specified'
    );

  }

  getUniversityName(course: any): string {

    const names = course?._institutionNames ?? [];

    if (names.length > 0) {
      return names.join(', ');
    }

    return (
      course?.universityName ??
      course?.UniversityName ??
      course?.university?.universityName ??
      course?.University?.universityName ??
      course?.University?.Name ??
      ''
    );

  }

  getFacultyName(course: any): string {

    const names = course?._facultyNames ?? [];

    if (names.length > 0) {
      return names.join(', ');
    }

    return (
      course?.facultyName ??
      course?.FacultyName ??
      course?.faculty?.facultyName ??
      course?.faculty?.FacultyName ??
      course?.offering?.faculty?.facultyName ??
      course?.offering?.faculty?.FacultyName ??
      ''
    );

  }

  getDuration(course: any): string {

    const duration =
      course?.durationYears ??
      course?.DurationYears;

    if (duration == null) {
      return '';
    }

    return `${duration} years`;

  }

  // =========================================
  // NAVIGATION
  // =========================================

  openCourse(course: any): void {

    const courseId = this.getCourseId(course);

    if (!courseId || isNaN(Number(courseId))) {

      console.error('INVALID COURSE ID:', course);

      return;

    }

    console.log('OPENING SAVED COURSE:', courseId);

    this.router.navigate([
      '/course-details',
      courseId
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