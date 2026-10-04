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
import { AccessibilityControlsComponent } from '../components/accessibility-controls/accessibility-controls.component';


interface University {

  universityID: number;

  universityName: string;

  abbreviation: string | null;

  description?: string;

  province: string;

  city: string;

  institutionType: string;

  universityType: string;

  websiteURL?: string;

}


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

  university?: University;

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

  courseOfferings?: CourseOffering[];

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
    FooterComponent,
    AccessibilityControlsComponent
  ],

  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss']
})


export class CoursesPage implements OnInit {


  // =========================
  // API URLS
  // =========================

  private readonly coursesApi =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/Courses';

  private readonly courseOfferingsApi =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/CourseOfferings';

  private readonly universitiesApi =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/Universities';


  // =========================
  // SEARCH
  // =========================

  searchTerm = '';


  // =========================
  // FILTERS
  // =========================

  selectedQualification = '';

  selectedProvince = '';

  selectedCity = '';

  selectedInstitutionType = '';


  // =========================
  // FILTER OPTIONS
  // =========================

  availableQualifications: string[] = [];

  availableProvinces: string[] = [];

  availableCities: string[] = [];

  availableInstitutionTypes: string[] = [];


  // =========================
  // COURSE DATA
  // =========================

  courses: Course[] = [];

  courseOfferings: CourseOffering[] = [];

  universities: University[] = [];


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
  // LOAD ALL COURSE DATA
  // =========================

  loadCourses(): void {

    this.loading = true;

    this.errorMessage = '';


    this.http.get<Course[]>(this.coursesApi).subscribe({

      next: (coursesData) => {

        console.log('========== COURSES ==========');

        console.log('Courses:', coursesData);


        this.courses = Array.isArray(coursesData)
          ? coursesData
          : [];


        // Load the information needed for
        // location and institution filters.

        this.loadCourseOfferings();

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
  // LOAD COURSE OFFERINGS
  // =========================

  loadCourseOfferings(): void {

    this.http.get<CourseOffering[]>(
      this.courseOfferingsApi
    ).subscribe({

      next: (data) => {

        console.log('========== COURSE OFFERINGS ==========');

        console.log('Course Offerings:', data);


        this.courseOfferings = Array.isArray(data)
          ? data
          : [];


        this.loadUniversities();

      },


      error: (error) => {

        console.error(
          'Course Offerings API error:',
          error
        );


        this.courseOfferings = [];

        this.loadUniversities();

      }

    });

  }


  // =========================
  // LOAD UNIVERSITIES
  // =========================

  loadUniversities(): void {

    this.http.get<University[]>(
      this.universitiesApi
    ).subscribe({

      next: (data) => {

        console.log('========== UNIVERSITIES ==========');

        console.log('Universities:', data);


        this.universities = Array.isArray(data)
          ? data
          : [];


        this.buildFilterOptions();

        this.attachCourseOfferings();


        this.loading = false;

        this.cdr.detectChanges();

      },


      error: (error) => {

        console.error(
          'Universities API error:',
          error
        );


        this.universities = [];

        this.buildFilterOptions();

        this.attachCourseOfferings();


        this.loading = false;

        this.cdr.detectChanges();

      }

    });

  }


  // =========================
  // ATTACH COURSE OFFERINGS
  // =========================

  attachCourseOfferings(): void {

    this.courses.forEach(course => {

      const offerings =
        this.courseOfferings.filter(
          offering =>
            Number(offering.courseID) ===
            Number(course.courseID)
        );


      offerings.forEach(offering => {

        const university =
          this.universities.find(
            university =>
              Number(university.universityID) ===
              Number(offering.universityID)
          );


        if (university) {

          offering.university = university;

        }

      });


      course.courseOfferings = offerings;

    });

  }


  // =========================
  // BUILD FILTER OPTIONS
  // =========================

  buildFilterOptions(): void {


    // =========================
    // QUALIFICATIONS
    // =========================

    this.availableQualifications = [

      ...new Set(

        this.courses

          .map(course =>
            course.qualificationType
          )

          .filter(
            (qualification): qualification is string =>
              !!qualification?.trim()
          )

      )

    ].sort();


    // =========================
    // PROVINCES
    // =========================

    this.availableProvinces = [

      ...new Set(

        this.universities

          .map(university =>
            university.province
          )

          .filter(
            (province): province is string =>
              !!province?.trim()
          )

      )

    ].sort();


    // =========================
    // CITIES
    // =========================

    this.updateAvailableCities();


    // =========================
    // INSTITUTION TYPES
    // =========================

    this.availableInstitutionTypes = [

      ...new Set(

        this.universities

          .map(university =>
            university.institutionType
          )

          .filter(
            (type): type is string =>
              !!type?.trim()
          )

      )

    ].sort();

  }


  // =========================
  // UPDATE CITIES
  // =========================

  updateAvailableCities(): void {

    let universitiesForCities =
      this.universities;


    // If a province has been selected,
    // only show cities from that province.

    if (this.selectedProvince) {

      universitiesForCities =
        this.universities.filter(
          university =>
            university.province ===
            this.selectedProvince
        );

    }


    this.availableCities = [

      ...new Set(

        universitiesForCities

          .map(university =>
            university.city
          )

          .filter(
            (city): city is string =>
              !!city?.trim()
          )

      )

    ].sort();


    // If the selected city is no longer
    // available, clear it.

    if (

      this.selectedCity &&

      !this.availableCities.includes(
        this.selectedCity
      )

    ) {

      this.selectedCity = '';

    }

  }


  // =========================
  // PROVINCE CHANGE
  // =========================

  onProvinceChange(): void {

    this.selectedCity = '';

    this.updateAvailableCities();

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

        course.courseOfferings?.some(
          offering => {

            const university =
              offering.university;

            return (

              university?.universityName
                ?.toLowerCase()
                .includes(search) ||

              university?.city
                ?.toLowerCase()
                .includes(search) ||

              university?.province
                ?.toLowerCase()
                .includes(search) ||

              university?.abbreviation
                ?.toLowerCase()
                .includes(search)

            );

          }

        );


      // =========================
      // QUALIFICATION
      // =========================

      const matchesQualification =

        !this.selectedQualification ||

        course.qualificationType ===
        this.selectedQualification;


      // =========================
      // LOCATION
      // =========================

      const matchesLocation =

        (!this.selectedProvince &&
         !this.selectedCity)

        ||

        !!course.courseOfferings?.some(
          offering => {

            const university =
              offering.university;

            if (!university) {

              return false;

            }


            const matchesProvince =

              !this.selectedProvince ||

              university.province ===
              this.selectedProvince;


            const matchesCity =

              !this.selectedCity ||

              university.city ===
              this.selectedCity;


            return (

              matchesProvince &&

              matchesCity

            );

          }

        );


      // =========================
      // INSTITUTION TYPE
      // =========================

      const matchesInstitutionType =

        !this.selectedInstitutionType

        ||

        !!course.courseOfferings?.some(
          offering =>

            offering.university
              ?.institutionType ===
            this.selectedInstitutionType

        );


      // =========================
      // FINAL RESULT
      // =========================

      return (

        matchesSearch &&

        matchesQualification &&

        matchesLocation &&

        matchesInstitutionType

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

    this.selectedProvince = '';

    this.selectedCity = '';

    this.selectedInstitutionType = '';


    this.updateAvailableCities();

  }


  // =========================
  // ACTIVE FILTER CHECK
  // =========================

  get hasActiveFilters(): boolean {

    return !!(

      this.searchTerm ||

      this.selectedQualification ||

      this.selectedProvince ||

      this.selectedCity ||

      this.selectedInstitutionType

    );

  }


  // =========================
  // INSTITUTION COUNT
  // =========================

  getInstitutionCount(course: Course): number {

    if (!course.courseOfferings?.length) {

      return 0;

    }


    const uniqueUniversities =
      new Set<number>();


    course.courseOfferings.forEach(
      (offering: any) => {

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

      }
    );


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


    course.courseOfferings.forEach(
      (offering: any) => {

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

      }
    );


    if (!names.length) {

      return 'Institution information unavailable';

    }


    if (names.length <= 2) {

      return names.join(', ');

    }


    return `${names[0]}, ${names[1]} +${names.length - 2} more`;

  }

}