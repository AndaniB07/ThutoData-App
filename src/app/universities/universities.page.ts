import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

import {
  IonContent,
  IonIcon
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import {
  searchOutline,
  filterOutline,
  locationOutline,
  schoolOutline,
  chevronForwardOutline,
  closeOutline,
  starOutline,
  star
} from 'ionicons/icons';

import { FooterComponent } from '../components/footer/footer.component';

import { Auth } from '../services/auth';
import { SavedService } from '../services/saved.service';


/* =========================
   INTERFACES
========================= */

interface University {
  universityID: number;
  universityName: string;
  abbreviation: string | null;
  description: string;
  province: string;
  city: string;
  institutionType: string;
  universityType: string;
  websiteURL: string;
}

interface Faculty {
  facultyID: number;
  universityID: number;
  facultyName: string;
  description?: string | null;
}

interface Course {
  courseID: number;
  courseName: string;
  courseCode?: string | null;
  qualificationType?: string | null;
  description?: string | null;
  durationYears?: number | null;
  studyLevel?: string | null;
  minimumAPS?: number | null;
}

interface CourseOffering {
  offeringID: number;
  courseID: number;
  universityID: number;
  facultyID: number;
  apsRequirement?: number | null;
}


/* =========================
   COMPONENT
========================= */

@Component({
  selector: 'app-universities',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonContent,
    IonIcon,
    FooterComponent
  ],

  templateUrl: './universities.page.html',
  styleUrls: ['./universities.page.scss']
})
export class UniversitiesPage implements OnInit {


  /* =========================
     API
  ========================== */

  private universitiesApi =
   'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/Universities';

  private facultiesApi =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/Faculties';

  private coursesApi =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/Courses';

  private courseOfferingsApi =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/CourseOfferings';


  /* =========================
     SEARCH
  ========================== */

  searchTerm = '';


  /* =========================
     FILTERS
  ========================== */

  selectedProvince = '';

  selectedFaculty = '';

  selectedCourse = '';

  selectedQualification = '';

  selectedUniversityType = '';


  /* =========================
     DATA
  ========================== */

  universities: University[] = [];

  faculties: Faculty[] = [];

  courses: Course[] = [];

  courseOfferings: CourseOffering[] = [];


  /* =========================
     SAVED UNIVERSITIES
  ========================== */

  savedUniversityIds = new Set<number>();

  savingUniversityId: number | null = null;


  /* =========================
     FILTER OPTIONS
  ========================== */

  availableFaculties: Faculty[] = [];

  availableCourses: Course[] = [];

  qualificationTypes: string[] = [];

  universityTypes: string[] = [];


  /* =========================
     STATE
  ========================== */

  loading = true;

  errorMessage = '';


  /* =========================
     CONSTRUCTOR
  ========================== */

  constructor(
    private http: HttpClient,
    private auth: Auth,
    private savedService: SavedService,
    private router: Router
  ) {

    addIcons({
      searchOutline,
      filterOutline,
      locationOutline,
      schoolOutline,
      chevronForwardOutline,
      closeOutline,
      starOutline,
      star
    });

  }


  /* =========================
     INITIAL LOAD
  ========================== */

  ngOnInit(): void {

    this.loadAllData();

  }


  /* =========================
     LOAD EVERYTHING
  ========================== */

  loadAllData(): void {

    this.loading = true;

    this.errorMessage = '';


    this.http.get<University[]>(
      this.universitiesApi
    ).subscribe({

      next: (data) => {

        console.log(
          '========== UNIVERSITIES API =========='
        );

        console.log(
          'RAW DATA:',
          data
        );

        console.log(
          'IS ARRAY:',
          Array.isArray(data)
        );

        console.log(
          'LENGTH:',
          data.length
        );


        // Load universities first.

        this.universities = data.filter(
          institution =>
            institution.institutionType
              ?.toLowerCase() === 'university'
        );


        console.log(
          'UNIVERSITIES AFTER FILTER:',
          this.universities
        );


        console.log(
          'UNIVERSITY COUNT:',
          this.universities.length
        );


        this.updateUniversityTypes();


        // University cards can display immediately.

        this.loading = false;


        // Load saved universities.

        this.loadSavedUniversities();


        // Load filter data separately.

        this.loadFaculties();

      },


      error: (error) => {

        console.error(
          'Universities API error:',
          error
        );


        this.universities = [];

        this.loading = false;

        this.errorMessage =
          'Unable to load universities. Please reload the page';

      }

    });

  }


  /* =========================
     LOAD SAVED UNIVERSITIES
  ========================== */

  loadSavedUniversities(): void {

    /*
     * IMPORTANT:
     *
     * We use getUser() and getToken()
     * directly here instead of relying
     * only on isLoggedIn().
     *
     * Your Profile page has already
     * confirmed that getUser() correctly
     * returns the logged-in user.
     */

    const user = this.auth.getUser();

    const token = this.auth.getToken();


    console.log(
      '========== SAVED UNIVERSITIES =========='
    );

    console.log(
      'LOGGED-IN USER:',
      user
    );

    console.log(
      'TOKEN EXISTS:',
      !!token
    );


    /*
     * If there is no user or token,
     * simply don't load saved universities.
     *
     * We DO NOT redirect to login here.
     *
     * This is important because simply
     * opening the Universities page should
     * never unexpectedly send the user
     * to the login page.
     */

    if (!user || !token) {

      console.log(
        'No logged-in user. Skipping saved universities.'
      );

      this.savedUniversityIds.clear();

      return;

    }


    console.log(
      'Loading saved universities for user:',
      user.userID
    );


    this.savedService
      .getSavedUniversities()
      .subscribe({

        next: (data) => {

          console.log(
            'SAVED UNIVERSITIES:',
            data
          );


          this.savedUniversityIds.clear();


          if (!Array.isArray(data)) {

            console.log(
              'Saved universities response is not an array.'
            );

            return;

          }


          data.forEach((item: any) => {

            /*
             * The backend may return:
             *
             * {
             *   universityID: 1
             * }
             *
             * OR:
             *
             * {
             *   UniversityID: 1
             * }
             *
             * OR an embedded University object.
             */

            const universityId =
              item?.universityID ??
              item?.UniversityID ??
              item?.university?.universityID ??
              item?.University?.universityID ??
              item?.University?.UniversityID;


            if (universityId != null) {

              this.savedUniversityIds.add(
                Number(universityId)
              );

            }

          });


          console.log(
            'SAVED UNIVERSITY IDS:',
            [...this.savedUniversityIds]
          );

        },


        error: (error) => {

          console.error(
            'Saved universities error:',
            error
          );

          /*
           * Do not send the user to login here.
           *
           * If the saved endpoint has a problem,
           * the Universities page should still
           * remain usable.
           */

        }

      });

  }


  /* =========================
     CHECK IF UNIVERSITY IS SAVED
  ========================== */

  isUniversitySaved(
    universityId: number
  ): boolean {

    return this.savedUniversityIds.has(
      Number(universityId)
    );

  }


  /* =========================
     SAVE / REMOVE UNIVERSITY
  ========================== */

  toggleUniversitySave(
    universityId: number
  ): void {

    /*
     * Check the SAME authentication
     * information used by the Profile page.
     */

    const user = this.auth.getUser();

    const token = this.auth.getToken();


    console.log(
      '========== STAR CLICKED =========='
    );

    console.log(
      'USER:',
      user
    );

    console.log(
      'TOKEN EXISTS:',
      !!token
    );


    /* =========================
       USER NOT LOGGED IN
    ========================== */

    if (!user || !token) {

      console.log(
        'User must log in before saving a university.'
      );


      this.router.navigate(
        ['/login']
      );


      return;

    }


    console.log(
      'Logged-in user confirmed:',
      user.userID
    );


    /* =========================
       PREVENT DOUBLE CLICK
    ========================== */

    if (
      this.savingUniversityId !== null
    ) {

      return;

    }


    this.savingUniversityId =
      universityId;


    /* =========================
       REMOVE UNIVERSITY
    ========================== */

    if (
      this.isUniversitySaved(
        universityId
      )
    ) {

      console.log(
        'Removing university:',
        universityId
      );


      this.savedService
        .removeUniversity(
          universityId
        )
        .subscribe({

          next: () => {

            console.log(
              'University removed from saved items:',
              universityId
            );


            this.savedUniversityIds.delete(
              universityId
            );


            this.savingUniversityId = null;

          },


          error: (error) => {

            console.error(
              'Remove university error:',
              error
            );


            this.savingUniversityId = null;

          }

        });


      return;

    }


    /* =========================
       SAVE UNIVERSITY
    ========================== */

    console.log(
      'Saving university:',
      universityId
    );


    this.savedService
      .saveUniversity(
        universityId
      )
      .subscribe({

        next: () => {

          console.log(
            'University saved:',
            universityId
          );


          this.savedUniversityIds.add(
            universityId
          );


          this.savingUniversityId = null;

        },


        error: (error) => {

          console.error(
            'Save university error:',
            error
          );


          this.savingUniversityId = null;

        }

      });

  }


  /* =========================
     FACULTIES
  ========================== */

  loadFaculties(): void {

    this.http.get<Faculty[]>(
      this.facultiesApi
    ).subscribe({

      next: (data) => {

        console.log(
          'FACULTIES:',
          data
        );


        this.faculties =
          data || [];


        this.availableFaculties = [
          ...this.faculties
        ];


        this.loadCourses();

      },


      error: (error) => {

        console.error(
          'Faculties API error:',
          error
        );


        this.faculties = [];

        this.availableFaculties = [];


        this.loadCourses();

      }

    });

  }


  /* =========================
     COURSES
  ========================== */

  loadCourses(): void {

    this.http.get<Course[]>(
      this.coursesApi
    ).subscribe({

      next: (data) => {

        console.log(
          'COURSES:',
          data
        );


        this.courses =
          data || [];


        this.availableCourses = [
          ...this.courses
        ];


        this.updateQualificationTypes();


        this.loadCourseOfferings();

      },


      error: (error) => {

        console.error(
          'Courses API error:',
          error
        );


        this.courses = [];

        this.availableCourses = [];

        this.qualificationTypes = [];


        this.loadCourseOfferings();

      }

    });

  }


  /* =========================
     COURSE OFFERINGS
  ========================== */

  loadCourseOfferings(): void {

    this.http.get<CourseOffering[]>(
      this.courseOfferingsApi
    ).subscribe({

      next: (data) => {

        console.log(
          'COURSE OFFERINGS:',
          data
        );


        this.courseOfferings =
          data || [];


        this.updateFilterOptions();

      },


      error: (error) => {

        console.error(
          'Course Offerings API error:',
          error
        );


        this.courseOfferings = [];


        this.updateFilterOptions();

      }

    });

  }


  /* =========================
     UNIVERSITY TYPES
  ========================== */

  updateUniversityTypes(): void {

    this.universityTypes = [
      ...new Set(
        this.universities
          .map(
            u => u.universityType
          )
          .filter(
            (type): type is string =>
              !!type
          )
      )
    ];

  }


  /* =========================
     QUALIFICATION TYPES
  ========================== */

  updateQualificationTypes(): void {

    this.qualificationTypes = [
      ...new Set(
        this.courses
          .map(
            course =>
              course.qualificationType
          )
          .filter(
            (type): type is string =>
              !!type
          )
      )
    ];

  }


  /* =========================
     UPDATE FILTER OPTIONS
  ========================== */

  updateFilterOptions(): void {

    this.updateAvailableFaculties();

    this.updateAvailableCourses();

  }


  /* =========================
     FACULTY OPTIONS
  ========================== */

  updateAvailableFaculties(): void {

    if (!this.selectedCourse) {

      this.availableFaculties = [
        ...this.faculties
      ];

      return;

    }


    const courseID =
      Number(this.selectedCourse);


    const universityIDs =
      this.courseOfferings
        .filter(
          offering =>
            offering.courseID === courseID
        )
        .map(
          offering =>
            offering.universityID
        );


    const facultyIDs =
      this.courseOfferings
        .filter(
          offering =>
            offering.courseID === courseID
        )
        .map(
          offering =>
            offering.facultyID
        );


    this.availableFaculties =
      this.faculties.filter(
        faculty =>
          facultyIDs.includes(
            faculty.facultyID
          ) &&
          universityIDs.length > 0
      );

  }


  /* =========================
     COURSE OPTIONS
  ========================== */

  updateAvailableCourses(): void {

    if (!this.selectedFaculty) {

      this.availableCourses = [
        ...this.courses
      ];

      return;

    }


    const facultyID =
      Number(this.selectedFaculty);


    const courseIDs =
      this.courseOfferings
        .filter(
          offering =>
            offering.facultyID === facultyID
        )
        .map(
          offering =>
            offering.courseID
        );


    this.availableCourses =
      this.courses.filter(
        course =>
          courseIDs.includes(
            course.courseID
          )
      );

  }


  /* =========================
     FILTERED UNIVERSITIES
  ========================== */

  get filteredUniversities(): University[] {

    const search =
      this.searchTerm
        .toLowerCase()
        .trim();


    return this.universities.filter(
      university => {

        const matchesSearch =
          !search ||
          university.universityName
            ?.toLowerCase()
            .includes(search) ||
          university.city
            ?.toLowerCase()
            .includes(search) ||
          university.province
            ?.toLowerCase()
            .includes(search) ||
          university.abbreviation
            ?.toLowerCase()
            .includes(search);


        const matchesProvince =
          !this.selectedProvince ||
          university.province ===
            this.selectedProvince;


        return (
          matchesSearch &&
          matchesProvince
        );

      }
    );

  }


  /* =========================
     FILTER CHANGE
  ========================== */

  onFacultyChange(): void {

    if (
      this.selectedFaculty &&
      this.selectedCourse
    ) {

      const valid =
        this.courseOfferings.some(
          offering =>
            offering.facultyID ===
              Number(this.selectedFaculty) &&

            offering.courseID ===
              Number(this.selectedCourse)
        );


      if (!valid) {

        this.selectedCourse = '';

      }

    }


    this.updateAvailableCourses();

  }


  onCourseChange(): void {

    this.updateAvailableFaculties();

  }


  /* =========================
     CLEAR FILTERS
  ========================== */

  clearFilters(): void {

    this.searchTerm = '';

    this.selectedProvince = '';

    this.selectedFaculty = '';

    this.selectedCourse = '';

    this.selectedQualification = '';

    this.selectedUniversityType = '';


    this.availableFaculties = [
      ...this.faculties
    ];


    this.availableCourses = [
      ...this.courses
    ];

  }


  /* =========================
     ACTIVE FILTERS
  ========================== */

  get hasActiveFilters(): boolean {

    return !!(
      this.searchTerm ||
      this.selectedProvince ||
      this.selectedFaculty ||
      this.selectedCourse ||
      this.selectedQualification ||
      this.selectedUniversityType
    );

  }


  /* =========================
     RETRY
  ========================== */

  retry(): void {

    this.loadAllData();

  }

}