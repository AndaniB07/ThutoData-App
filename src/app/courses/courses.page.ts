import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

import {
  IonContent,
  IonIcon
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import {
  searchOutline,
  filterOutline,
  schoolOutline,
  starOutline,
  star,
  chevronForwardOutline,
  closeOutline,
  timeOutline
} from 'ionicons/icons';

import { FooterComponent } from '../components/footer/footer.component';
import { Auth } from '../services/auth';
import { SavedService } from '../services/saved.service';


interface CourseOffering {

  offeringID: number;

  courseID: number;

  universityID: number;

  facultyID: number;

  apsRequirement: number;

  subjectRequirements: string;

  admissionRequirements: string;

  applicationInformation: string;

  applicationURL: string;

  university?: {
    universityID: number;
    universityName: string;
    abbreviation: string | null;
    province: string;
    city: string;
    institutionType: string;
    universityType: string;
  };

  faculty?: {
    facultyID: number;
    facultyName: string;
  };

}


interface Course {

  courseID: number;

  courseName: string;

  courseCode: string;

  qualificationType: string;

  description: string;

  durationYears: number;

  studyLevel: string;

  minimumAPS: number;

  entryRequirements: string;

  careerOpportunities: string;

  courseOfferings: CourseOffering[];

}


@Component({
  selector: 'app-courses',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonContent,
    IonIcon,
    FooterComponent
  ],

  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss']
})


export class CoursesPage implements OnInit {


  private readonly apiUrl =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/Courses';


  // =========================
  // SEARCH
  // =========================

  searchTerm = '';


  // =========================
  // FILTERS
  // =========================

  selectedQualification = '';

  selectedStudyLevel = '';


  availableQualifications: string[] = [];

  availableStudyLevels: string[] = [];


  // =========================
  // COURSE DATA
  // =========================

  courses: Course[] = [];


  // =========================
  // SAVED COURSES
  // =========================

  savedCourseIds = new Set<number>();

  savingCourseId: number | null = null;


  // =========================
  // STATE
  // =========================

  loading = true;

  errorMessage = '';


  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private auth: Auth,
    private savedService: SavedService
  ) {

    addIcons({

      searchOutline,
      filterOutline,
      schoolOutline,
      starOutline,
      star,
      chevronForwardOutline,
      closeOutline,
      timeOutline

    });

  }


  // =========================
  // PAGE LOAD
  // =========================

  ngOnInit(): void {

    this.loadCourses();

    this.loadSavedCourses();

  }


  // =========================
  // LOAD COURSES
  // =========================

  loadCourses(): void {

    this.loading = true;

    this.errorMessage = '';


    this.http.get<Course[]>(this.apiUrl).subscribe({

      next: (data) => {

        console.log('========== COURSES API ==========');

        console.log('RAW DATA:', data);

        console.log(
          'TOTAL COURSES:',
          Array.isArray(data) ? data.length : 0
        );


        this.courses = Array.isArray(data)
          ? data
          : [];


        this.buildFilterOptions();


        this.loading = false;


        this.cdr.detectChanges();

      },


      error: (error) => {

        console.error(
          'Courses API error:',
          error
        );


        this.errorMessage =
          'Unable to load courses. Please reload the page.';


        this.courses = [];

        this.loading = false;


        this.cdr.detectChanges();

      }

    });

  }


  // =========================
  // BUILD FILTER OPTIONS
  // =========================

  buildFilterOptions(): void {


    this.availableQualifications = [

      ...new Set(

        this.courses

          .map(course => course.qualificationType)

          .filter(
            (qualification): qualification is string =>
              !!qualification
          )

      )

    ].sort();


    this.availableStudyLevels = [

      ...new Set(

        this.courses

          .map(course => course.studyLevel)

          .filter(
            (level): level is string =>
              !!level
          )

      )

    ].sort();

  }


  // =========================
  // FILTERED COURSES
  // =========================

  get filteredCourses(): Course[] {

    const search =
      this.searchTerm
        .toLowerCase()
        .trim();


    return this.courses.filter(course => {


      // =========================
      // SEARCH
      // =========================

      const matchesSearch =

        !search ||

        course.courseName
          ?.toLowerCase()
          .includes(search) ||

        course.courseCode
          ?.toLowerCase()
          .includes(search) ||

        course.qualificationType
          ?.toLowerCase()
          .includes(search) ||

        course.studyLevel
          ?.toLowerCase()
          .includes(search) ||

        course.courseOfferings?.some(
          offering =>
            offering.university?.universityName
              ?.toLowerCase()
              .includes(search)
        );


      // =========================
      // QUALIFICATION
      // =========================

      const matchesQualification =

        !this.selectedQualification ||

        course.qualificationType ===
          this.selectedQualification;


      // =========================
      // STUDY LEVEL
      // =========================

      const matchesStudyLevel =

        !this.selectedStudyLevel ||

        course.studyLevel ===
          this.selectedStudyLevel;


      return (

        matchesSearch &&

        matchesQualification &&

        matchesStudyLevel

      );

    });

  }


  // =========================
  // SAVED COURSES
  // =========================

  loadSavedCourses(): void {

    const user = this.auth.getUser();

    const token = this.auth.getToken();


    if (!user || !token) {

      this.savedCourseIds.clear();

      return;

    }


    this.savedService.getSavedCourses().subscribe({

      next: (data) => {

        this.savedCourseIds.clear();


        if (!Array.isArray(data)) {

          return;

        }


        data.forEach(item => {

          const courseId =

            item?.courseID ??

            item?.CourseID ??

            item?.courseId ??

            item?.CourseId ??

            item?.course?.courseID ??

            item?.Course?.courseID ??

            item?.Course?.CourseID;


          if (courseId != null) {

            this.savedCourseIds.add(
              Number(courseId)
            );

          }

        });


        this.cdr.detectChanges();

      },


      error: (error) => {

        console.error(
          'ERROR LOADING SAVED COURSES:',
          error
        );

      }

    });

  }


  // =========================
  // CHECK SAVED
  // =========================

  isCourseSaved(courseId: number): boolean {

    return this.savedCourseIds.has(
      Number(courseId)
    );

  }


  // =========================
  // SAVE / REMOVE COURSE
  // =========================

  toggleCourseSave(courseId: number): void {

    const user = this.auth.getUser();

    const token = this.auth.getToken();


    if (!user || !token) {

      console.log(
        'User must be logged in to save a course.'
      );

      return;

    }


    if (this.savingCourseId !== null) {

      return;

    }


    this.savingCourseId =
      Number(courseId);


    // =========================
    // REMOVE
    // =========================

    if (this.isCourseSaved(courseId)) {

      this.savedService
        .removeCourse(courseId)
        .subscribe({

          next: () => {

            this.savedCourseIds.delete(
              Number(courseId)
            );


            this.savingCourseId = null;


            this.cdr.detectChanges();

          },


          error: (error) => {

            console.error(
              'ERROR REMOVING COURSE:',
              error
            );


            this.savingCourseId = null;


            this.cdr.detectChanges();

          }

        });


      return;

    }


    // =========================
    // SAVE
    // =========================

    this.savedService
      .saveCourse(courseId)
      .subscribe({

        next: () => {

          this.savedCourseIds.add(
            Number(courseId)
          );


          this.savingCourseId = null;


          this.cdr.detectChanges();

        },


        error: (error) => {

          console.error(
            'ERROR SAVING COURSE:',
            error
          );


          this.savingCourseId = null;


          this.cdr.detectChanges();

        }

      });

  }


  // =========================
  // CLEAR FILTERS
  // =========================

  clearFilters(): void {

    this.searchTerm = '';

    this.selectedQualification = '';

    this.selectedStudyLevel = '';

  }


  // =========================
  // ACTIVE FILTER CHECK
  // =========================

  get hasActiveFilters(): boolean {

    return !!(

      this.searchTerm ||

      this.selectedQualification ||

      this.selectedStudyLevel

    );

  }


  // =========================
  // INSTITUTION COUNT
  // =========================

  getInstitutionCount(course: Course): number {

  if (!course.courseOfferings?.length) {
    return 0;
  }

  const uniqueUniversities = new Set<number>();

  course.courseOfferings.forEach((offering: any) => {

    const universityId =
      offering?.universityID ??
      offering?.UniversityID ??
      offering?.university?.universityID ??
      offering?.university?.UniversityID ??
      offering?.University?.universityID ??
      offering?.University?.UniversityID;

    if (universityId != null) {
      uniqueUniversities.add(
        Number(universityId)
      );
    }

  });

  return uniqueUniversities.size;
  }


  // =========================
  // INSTITUTION NAMES
  // =========================

  getInstitutionNames(course: Course): string {

  if (!course.courseOfferings?.length) {
    return 'Institution information unavailable';
  }

  const names: string[] = [];

  course.courseOfferings.forEach((offering: any) => {

    const name =
      offering?.university?.universityName ??
      offering?.university?.UniversityName ??
      offering?.universityName ??
      offering?.UniversityName ??
      offering?.University?.universityName ??
      offering?.University?.UniversityName;

    if (
      name &&
      !names.includes(name)
    ) {
      names.push(name);
    }

  });

  if (!names.length) {
    return 'Institution information unavailable';
  }

  if (names.length <= 2) {
    return names.join(', ');
  }

  return `${names[0]}, ${names[1]} +${names.length - 2} more`;
}

}