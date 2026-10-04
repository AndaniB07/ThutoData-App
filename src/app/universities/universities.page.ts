import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

import {
  IonContent,
  IonIcon,
  ViewWillEnter
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

import {
  AccessibilityControlsComponent
} from '../components/accessibility-controls/accessibility-controls.component';


/* =========================================================
   INTERFACES
========================================================= */

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


/* =========================================================
   COMPONENT
========================================================= */

@Component({

  selector: 'app-universities',

  standalone: true,

  imports: [

    CommonModule,

    FormsModule,

    RouterLink,

    IonContent,

    IonIcon,

    FooterComponent,

    AccessibilityControlsComponent

  ],

  templateUrl: './universities.page.html',

  styleUrls: ['./universities.page.scss']

})


export class UniversitiesPage
  implements OnInit, ViewWillEnter {


  /* =========================================================
     API
  ========================================================= */

  private universitiesApi =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/Universities';

  private facultiesApi =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/Faculties';

  private coursesApi =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/Courses';

  private courseOfferingsApi =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/CourseOfferings';


  /* =========================================================
     SEARCH
  ========================================================= */

  searchTerm = '';


  /* =========================================================
     FILTERS
  ========================================================= */

  selectedProvince = '';

  selectedCity = '';

  selectedFaculty = '';

  selectedCourse = '';

  selectedQualification = '';

  selectedUniversityType = '';


  /* =========================================================
     DATA
  ========================================================= */

  universities: University[] = [];

  faculties: Faculty[] = [];

  courses: Course[] = [];

  courseOfferings: CourseOffering[] = [];


  /* =========================================================
     SAVED UNIVERSITIES
  ========================================================= */

  savedUniversityIds = new Set<number>();

  savingUniversityId: number | null = null;


  /* =========================================================
     FILTER OPTIONS
  ========================================================= */

  availableCities: string[] = [];

  availableFaculties: Faculty[] = [];

  availableCourses: Course[] = [];

  qualificationTypes: string[] = [];

  universityTypes: string[] = [];


  /* =========================================================
     STATE
  ========================================================= */

  loading = true;

  errorMessage = '';


  /* =========================================================
     CONSTRUCTOR
  ========================================================= */

  constructor(

    private http: HttpClient,

    private auth: Auth,

    private savedService: SavedService,

    private router: Router,

    private cdr: ChangeDetectorRef

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


  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  ngOnInit(): void {

    this.loadAllData();

  }


  ionViewWillEnter(): void {

    this.loadSavedUniversities();

  }


  /* =========================================================
     LOAD ALL DATA
  ========================================================= */

  loadAllData(): void {

    this.loading = true;

    this.errorMessage = '';


    this.http
      .get<University[]>(this.universitiesApi)
      .subscribe({

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


          /* -----------------------------------------
             ONLY UNIVERSITIES
          ----------------------------------------- */

          this.universities =
            (data || []).filter(

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


          /* -----------------------------------------
             INITIAL FILTER OPTIONS
          ----------------------------------------- */

          this.updateUniversityTypes();

          this.updateAvailableCities();


          /* -----------------------------------------
             SHOW UNIVERSITIES
          ----------------------------------------- */

          this.loading = false;

          this.cdr.detectChanges();


          /* -----------------------------------------
             LOAD RELATED DATA
          ----------------------------------------- */

          this.loadSavedUniversities();

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
            'Unable to load universities. Please reload the page.';

        }

      });

  }


  /* =========================================================
     LOAD SAVED UNIVERSITIES
  ========================================================= */

  loadSavedUniversities(): void {

    const user =
      this.auth.getUser();

    const token =
      this.auth.getToken();


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


    /* -----------------------------------------
       USER NOT LOGGED IN
    ----------------------------------------- */

    if (!user || !token) {

      console.log(
        'No logged-in user. Skipping saved universities.'
      );

      this.savedUniversityIds.clear();

      this.cdr.detectChanges();

      return;

    }


    /* -----------------------------------------
       LOAD SAVED UNIVERSITIES
    ----------------------------------------- */

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

            this.cdr.detectChanges();

            return;

          }


          data.forEach((item: any) => {

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


          this.cdr.detectChanges();

        },


        error: (error) => {

          console.error(
            'Saved universities error:',
            error
          );

        }

      });

  }


  /* =========================================================
     CHECK IF UNIVERSITY IS SAVED
  ========================================================= */

  isUniversitySaved(
    universityId: number
  ): boolean {

    return this.savedUniversityIds.has(
      Number(universityId)
    );

  }


  /* =========================================================
     SAVE / REMOVE UNIVERSITY
  ========================================================= */

  toggleUniversitySave(
    universityId: number
  ): void {

    const user =
      this.auth.getUser();

    const token =
      this.auth.getToken();


    if (!user || !token) {

      this.router.navigate(
        ['/login']
      );

      return;

    }


    if (
      this.savingUniversityId !== null
    ) {

      return;

    }


    this.savingUniversityId =
      universityId;


    /* -----------------------------------------
       REMOVE
    ----------------------------------------- */

    if (
      this.isUniversitySaved(
        universityId
      )
    ) {

      this.savedService
        .removeUniversity(
          universityId
        )
        .subscribe({

          next: () => {

            this.savedUniversityIds.delete(
              universityId
            );

            this.savingUniversityId = null;

            this.cdr.detectChanges();

          },


          error: (error) => {

            console.error(
              'Remove university error:',
              error
            );

            this.savingUniversityId = null;

            this.cdr.detectChanges();

          }

        });


      return;

    }


    /* -----------------------------------------
       SAVE
    ----------------------------------------- */

    this.savedService
      .saveUniversity(
        universityId
      )
      .subscribe({

        next: () => {

          this.savedUniversityIds.add(
            universityId
          );

          this.savingUniversityId = null;

          this.cdr.detectChanges();

        },


        error: (error) => {

          console.error(
            'Save university error:',
            error
          );

          this.savingUniversityId = null;

          this.cdr.detectChanges();

        }

      });

  }


  /* =========================================================
     LOAD FACULTIES
  ========================================================= */

  loadFaculties(): void {

    this.http
      .get<Faculty[]>(this.facultiesApi)
      .subscribe({

        next: (data) => {

          console.log(
            'FACULTIES:',
            data
          );


          this.faculties =
            data || [];


          this.availableFaculties =
            [...this.faculties];


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


  /* =========================================================
     LOAD COURSES
  ========================================================= */

  loadCourses(): void {

    this.http
      .get<Course[]>(this.coursesApi)
      .subscribe({

        next: (data) => {

          console.log(
            'COURSES:',
            data
          );


          this.courses =
            data || [];


          this.availableCourses =
            [...this.courses];


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


  /* =========================================================
     LOAD COURSE OFFERINGS
  ========================================================= */

  loadCourseOfferings(): void {

    this.http
      .get<CourseOffering[]>(
        this.courseOfferingsApi
      )
      .subscribe({

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


  /* =========================================================
     UNIVERSITY TYPES
  ========================================================= */

  updateUniversityTypes(): void {

    this.universityTypes = [

      ...new Set(

        this.universities

          .map(
            university =>
              university.universityType
          )

          .filter(
            (type): type is string =>
              !!type
          )

      )

    ];

  }


  /* =========================================================
     CITIES
  ========================================================= */

  updateAvailableCities(): void {

    let universitiesForCities =
      [...this.universities];


    /* -----------------------------------------
       PROVINCE
    ----------------------------------------- */

    if (this.selectedProvince) {

      universitiesForCities =
        universitiesForCities.filter(

          university =>
            university.province
              ?.toLowerCase() ===
            this.selectedProvince
              .toLowerCase()

        );

    }


    const cities =

      universitiesForCities

        .map(
          university =>
            university.city
        )

        .filter(
          (city): city is string =>
            !!city
        )

        .map(
          city =>
            city.trim()
        )

        .filter(
          city =>
            city.length > 0
        );


    this.availableCities = [

      ...new Set(cities)

    ].sort();

  }


  /* =========================================================
     QUALIFICATION TYPES
  ========================================================= */

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

          .map(
            type =>
              type.trim()
          )

          .filter(
            type =>
              type.length > 0
          )

      )

    ].sort();

  }


  /* =========================================================
     UPDATE ALL FILTER OPTIONS
  ========================================================= */

  updateFilterOptions(): void {

    this.updateAvailableCities();

    this.updateAvailableFaculties();

    this.updateAvailableCourses();

  }


  /* =========================================================
     FACULTY OPTIONS
  ========================================================= */

  updateAvailableFaculties(): void {

    let validOfferings =
      [...this.courseOfferings];


    /* -----------------------------------------
       PROVINCE
    ----------------------------------------- */

    if (this.selectedProvince) {

      const universityIDs =

        this.universities

          .filter(
            university =>
              university.province
                ?.toLowerCase() ===
              this.selectedProvince
                .toLowerCase()
          )

          .map(
            university =>
              university.universityID
          );


      validOfferings =
        validOfferings.filter(
          offering =>
            universityIDs.includes(
              offering.universityID
            )
        );

    }


    /* -----------------------------------------
       CITY
    ----------------------------------------- */

    if (this.selectedCity) {

      const universityIDs =

        this.universities

          .filter(
            university =>
              university.city
                ?.toLowerCase() ===
              this.selectedCity
                .toLowerCase()
          )

          .map(
            university =>
              university.universityID
          );


      validOfferings =
        validOfferings.filter(
          offering =>
            universityIDs.includes(
              offering.universityID
            )
        );

    }


    /* -----------------------------------------
       COURSE
    ----------------------------------------- */

    if (this.selectedCourse) {

      const courseID =
        Number(this.selectedCourse);


      validOfferings =
        validOfferings.filter(
          offering =>
            offering.courseID ===
            courseID
        );

    }


    /* -----------------------------------------
       QUALIFICATION
    ----------------------------------------- */

    if (this.selectedQualification) {

      const courseIDs =

        this.courses

          .filter(
            course =>
              course.qualificationType ===
              this.selectedQualification
          )

          .map(
            course =>
              course.courseID
          );


      validOfferings =
        validOfferings.filter(
          offering =>
            courseIDs.includes(
              offering.courseID
            )
        );

    }


    /* -----------------------------------------
       FACULTY IDS
    ----------------------------------------- */

    const facultyIDs = [

      ...new Set(

        validOfferings.map(
          offering =>
            offering.facultyID
        )

      )

    ];


    this.availableFaculties =

      this.faculties.filter(
        faculty =>
          facultyIDs.includes(
            faculty.facultyID
          )
      );

  }


  /* =========================================================
     COURSE OPTIONS
  ========================================================= */

  updateAvailableCourses(): void {

    let validOfferings =
      [...this.courseOfferings];


    /* -----------------------------------------
       PROVINCE
    ----------------------------------------- */

    if (this.selectedProvince) {

      const universityIDs =

        this.universities

          .filter(
            university =>
              university.province
                ?.toLowerCase() ===
              this.selectedProvince
                .toLowerCase()
          )

          .map(
            university =>
              university.universityID
          );


      validOfferings =
        validOfferings.filter(
          offering =>
            universityIDs.includes(
              offering.universityID
            )
        );

    }


    /* -----------------------------------------
       CITY
    ----------------------------------------- */

    if (this.selectedCity) {

      const universityIDs =

        this.universities

          .filter(
            university =>
              university.city
                ?.toLowerCase() ===
              this.selectedCity
                .toLowerCase()
          )

          .map(
            university =>
              university.universityID
          );


      validOfferings =
        validOfferings.filter(
          offering =>
            universityIDs.includes(
              offering.universityID
            )
        );

    }


    /* -----------------------------------------
       FACULTY
    ----------------------------------------- */

    if (this.selectedFaculty) {

      const facultyID =
        Number(this.selectedFaculty);


      validOfferings =
        validOfferings.filter(
          offering =>
            offering.facultyID ===
            facultyID
        );

    }


    /* -----------------------------------------
       QUALIFICATION
    ----------------------------------------- */

    if (this.selectedQualification) {

      const courseIDs =

        this.courses

          .filter(
            course =>
              course.qualificationType ===
              this.selectedQualification
          )

          .map(
            course =>
              course.courseID
          );


      validOfferings =
        validOfferings.filter(
          offering =>
            courseIDs.includes(
              offering.courseID
            )
        );

    }


    /* -----------------------------------------
       COURSE IDS
    ----------------------------------------- */

    const courseIDs = [

      ...new Set(

        validOfferings.map(
          offering =>
            offering.courseID
        )

      )

    ];


    this.availableCourses =

      this.courses.filter(
        course =>
          courseIDs.includes(
            course.courseID
          )
      );

  }


  /* =========================================================
     FILTERED UNIVERSITIES
  ========================================================= */

  get filteredUniversities(): University[] {

    const search =
      this.searchTerm
        .toLowerCase()
        .trim();


    const selectedFacultyID =

      this.selectedFaculty
        ? Number(this.selectedFaculty)
        : null;


    const selectedCourseID =

      this.selectedCourse
        ? Number(this.selectedCourse)
        : null;


    return this.universities.filter(
      university => {


        /* -----------------------------------------
           SEARCH
        ----------------------------------------- */

        const matchesSearch =

          !search ||

          university.universityName
            ?.toLowerCase()
            .includes(search) ||

          university.abbreviation
            ?.toLowerCase()
            .includes(search) ||

          university.city
            ?.toLowerCase()
            .includes(search) ||

          university.province
            ?.toLowerCase()
            .includes(search);


        /* -----------------------------------------
           PROVINCE
        ----------------------------------------- */

        const matchesProvince =

          !this.selectedProvince ||

          university.province
            ?.toLowerCase() ===
          this.selectedProvince
            .toLowerCase();


        /* -----------------------------------------
           CITY
        ----------------------------------------- */

        const matchesCity =

          !this.selectedCity ||

          university.city
            ?.toLowerCase() ===
          this.selectedCity
            .toLowerCase();


        /* -----------------------------------------
           UNIVERSITY TYPE
        ----------------------------------------- */

        const matchesUniversityType =

          !this.selectedUniversityType ||

          university.universityType ===
          this.selectedUniversityType;


        /* -----------------------------------------
           UNIVERSITY OFFERINGS
        ----------------------------------------- */

        const universityOfferings =

          this.courseOfferings.filter(
            offering =>
              offering.universityID ===
              university.universityID
          );


        /* -----------------------------------------
           FACULTY
        ----------------------------------------- */

        const matchesFaculty =

          !selectedFacultyID ||

          universityOfferings.some(
            offering =>
              offering.facultyID ===
              selectedFacultyID
          );


        /* -----------------------------------------
           COURSE
        ----------------------------------------- */

        const matchesCourse =

          !selectedCourseID ||

          universityOfferings.some(
            offering =>
              offering.courseID ===
              selectedCourseID
          );


        /* -----------------------------------------
           QUALIFICATION TYPE
        ----------------------------------------- */

        const matchesQualification =

          !this.selectedQualification ||

          universityOfferings.some(
            offering => {

              const course =
                this.courses.find(
                  c =>
                    c.courseID ===
                    offering.courseID
                );


              return (

                course?.qualificationType ===
                this.selectedQualification

              );

            }

          );


        /* -----------------------------------------
           FINAL RESULT
        ----------------------------------------- */

        return (

          matchesSearch &&

          matchesProvince &&

          matchesCity &&

          matchesUniversityType &&

          matchesFaculty &&

          matchesCourse &&

          matchesQualification

        );

      }

    );

  }


  /* =========================================================
     PROVINCE CHANGE
  ========================================================= */

  onProvinceChange(): void {

    /*
     * Rebuild the available city list
     * based on the selected province.
     */

    this.updateAvailableCities();


    /*
     * If the selected city does not
     * belong to the new province,
     * clear it.
     */

    if (

      this.selectedCity &&

      !this.availableCities.some(
        city =>
          city.toLowerCase() ===
          this.selectedCity.toLowerCase()
      )

    ) {

      this.selectedCity = '';

    }


    this.updateAvailableFaculties();

    this.updateAvailableCourses();


    /*
     * Check whether the selected
     * faculty is still valid.
     */

    if (

      this.selectedFaculty &&

      !this.availableFaculties.some(
        faculty =>
          faculty.facultyID ===
          Number(this.selectedFaculty)
      )

    ) {

      this.selectedFaculty = '';

    }


    /*
     * Check whether the selected
     * course is still valid.
     */

    if (

      this.selectedCourse &&

      !this.availableCourses.some(
        course =>
          course.courseID ===
          Number(this.selectedCourse)
      )

    ) {

      this.selectedCourse = '';

    }


    this.updateAvailableFaculties();

    this.updateAvailableCourses();

  }


  /* =========================================================
     CITY CHANGE
  ========================================================= */

  onCityChange(): void {

    this.updateAvailableFaculties();

    this.updateAvailableCourses();


    /*
     * Clear faculty if it does not
     * exist in the selected city.
     */

    if (

      this.selectedFaculty &&

      !this.availableFaculties.some(
        faculty =>
          faculty.facultyID ===
          Number(this.selectedFaculty)
      )

    ) {

      this.selectedFaculty = '';

    }


    /*
     * Clear course if it does not
     * exist in the selected city.
     */

    if (

      this.selectedCourse &&

      !this.availableCourses.some(
        course =>
          course.courseID ===
          Number(this.selectedCourse)
      )

    ) {

      this.selectedCourse = '';

    }


    this.updateAvailableFaculties();

    this.updateAvailableCourses();

  }


  /* =========================================================
     FACULTY CHANGE
  ========================================================= */

  onFacultyChange(): void {

    /*
     * If the selected course does not
     * belong to the selected faculty,
     * clear the course.
     */

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


  /* =========================================================
     COURSE CHANGE
  ========================================================= */

  onCourseChange(): void {

    /*
     * If a faculty is selected but does
     * not offer the selected course,
     * clear the faculty.
     */

    if (

      this.selectedCourse &&

      this.selectedFaculty

    ) {

      const valid =

        this.courseOfferings.some(
          offering =>

            offering.courseID ===
              Number(this.selectedCourse) &&

            offering.facultyID ===
              Number(this.selectedFaculty)

        );


      if (!valid) {

        this.selectedFaculty = '';

      }

    }


    this.updateAvailableFaculties();

  }


  /* =========================================================
     QUALIFICATION CHANGE
  ========================================================= */

  onQualificationChange(): void {

    this.updateAvailableFaculties();

    this.updateAvailableCourses();

  }


  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  clearFilters(): void {

    this.searchTerm = '';

    this.selectedProvince = '';

    this.selectedCity = '';

    this.selectedFaculty = '';

    this.selectedCourse = '';

    this.selectedQualification = '';

    this.selectedUniversityType = '';


    this.availableCities = [

      ...new Set(

        this.universities

          .map(
            university =>
              university.city
          )

          .filter(
            (city): city is string =>
              !!city
          )

          .map(
            city =>
              city.trim()
          )

          .filter(
            city =>
              city.length > 0
          )

      )

    ].sort();


    this.availableFaculties =
      [...this.faculties];


    this.availableCourses =
      [...this.courses];


    this.cdr.detectChanges();

  }


  /* =========================================================
     ACTIVE FILTERS
  ========================================================= */

  get hasActiveFilters(): boolean {

    return !!(

      this.searchTerm ||

      this.selectedProvince ||

      this.selectedCity ||

      this.selectedFaculty ||

      this.selectedCourse ||

      this.selectedQualification ||

      this.selectedUniversityType

    );

  }


  /* =========================================================
     RETRY
  ========================================================= */

  retry(): void {

    this.loadAllData();

  }

}