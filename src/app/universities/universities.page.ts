
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

import {
  IonContent,
  IonIcon,
  ToastController,
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
  academicField?: string | null;
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

export class UniversitiesPage implements OnInit, ViewWillEnter {

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
  selectedAcademicField = '';
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
  academicFields: string[] = [];
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
    private cdr: ChangeDetectorRef,
    private toastController: ToastController
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
     NOTIFICATION
  ========================================================= */

  async showNotification(
    message: string,
    color: string = 'success'
  ): Promise<void> {

    const toast = await this.toastController.create({
      message: message,
      duration: 3500,
      position: 'bottom',
      color: color,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });

    await toast.present();

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

          console.log('========== UNIVERSITIES API ==========');
          console.log('RAW DATA:', data);
          console.log('IS ARRAY:', Array.isArray(data));
          console.log('LENGTH:', data.length);

          this.universities = (data || []).filter(
            institution =>
              institution.institutionType?.toLowerCase() === 'university'
          );

          console.log('UNIVERSITIES AFTER FILTER:', this.universities);
          console.log('UNIVERSITY COUNT:', this.universities.length);

          this.updateUniversityTypes();
          this.updateAvailableCities();

          this.loading = false;
          this.cdr.detectChanges();

          this.loadFaculties();

        },

        error: (error) => {

          console.error('Universities API error:', error);

          this.universities = [];
          this.loading = false;

          this.errorMessage =
            'Unable to load universities. Please reload the page.';

          this.cdr.detectChanges();

        }

      });

  }


  /* =========================================================
     LOAD SAVED UNIVERSITIES
  ========================================================= */

  loadSavedUniversities(): void {

    const user = this.auth.getUser();
    const token = this.auth.getToken();

    console.log('========== SAVED UNIVERSITIES ==========');
    console.log('LOGGED-IN USER:', user);
    console.log('TOKEN EXISTS:', !!token);

    if (!user || !token) {

      console.log('No logged-in user. Skipping saved universities.');

      this.savedUniversityIds.clear();
      this.cdr.detectChanges();

      return;

    }

    this.savedService
      .getSavedUniversities()
      .subscribe({

        next: (data) => {

          console.log('SAVED UNIVERSITIES:', data);

          this.savedUniversityIds.clear();

          if (!Array.isArray(data)) {

            console.log('Saved universities response is not an array.');

            this.cdr.detectChanges();

            return;

          }

          data.forEach((item: any) => {

            const universityId =
              item?.universityID ??
              item?.UniversityID ??
              item?.university?.universityID ??
              item?.university?.UniversityID ??
              item?.University?.universityID ??
              item?.University?.UniversityID;

            if (universityId != null) {

              this.savedUniversityIds.add(Number(universityId));

            }

          });

          console.log(
            'SAVED UNIVERSITY IDS:',
            [...this.savedUniversityIds]
          );

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error('Saved universities error:', error);

        }

      });

  }


  /* =========================================================
     CHECK IF UNIVERSITY IS SAVED
  ========================================================= */

  isUniversitySaved(universityId: number): boolean {

    return this.savedUniversityIds.has(Number(universityId));

  }


  /* =========================================================
     SAVE / REMOVE UNIVERSITY
  ========================================================= */

  toggleUniversitySave(universityId: number): void {

    const user = this.auth.getUser();
    const token = this.auth.getToken();

    // Check whether the user is logged in
    if (!user || !token) {

      this.showNotification(
        'Please log in to save universities.',
        'warning'
      );

      this.router.navigate(['/login']);

      return;

    }

    if (this.savingUniversityId !== null) {

      return;

    }

    const id = Number(universityId);

    this.savingUniversityId = id;


    /* -----------------------------------------
       REMOVE UNIVERSITY
    ----------------------------------------- */

    if (this.isUniversitySaved(id)) {

      this.savedService
        .removeUniversity(id)
        .subscribe({

          next: () => {

            this.savedUniversityIds.delete(id);

            this.savingUniversityId = null;

            this.cdr.detectChanges();

            this.showNotification(
              'University removed from your saved items.',
              'medium'
            );

          },

          error: (error) => {

            console.error('Remove university error:', error);

            this.savingUniversityId = null;

            this.cdr.detectChanges();

            this.showNotification(
              'Unable to remove this university. Please try again.',
              'danger'
            );

          }

        });

      return;

    }


    /* -----------------------------------------
       SAVE UNIVERSITY
    ----------------------------------------- */

    this.savedService
      .saveUniversity(id)
      .subscribe({

        next: () => {

          this.savedUniversityIds.add(id);

          this.savingUniversityId = null;

          this.cdr.detectChanges();

          this.showNotification(
            'University saved successfully! You can view your saved universities in your profile.',
            'success'
          );

        },

        error: (error) => {

          console.error('Save university error:', error);

          this.savingUniversityId = null;

          this.cdr.detectChanges();

          this.showNotification(
            'Unable to save this university. Please try again.',
            'danger'
          );

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

          console.log('FACULTIES:', data);

          this.faculties = data || [];
          this.availableFaculties = [...this.faculties];

          this.loadCourses();

        },

        error: (error) => {

          console.error('Faculties API error:', error);

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

          console.log('COURSES:', data);

          this.courses = data || [];
          this.availableCourses = [...this.courses];

          this.loadCourseOfferings();

        },

        error: (error) => {

          console.error('Courses API error:', error);

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
      .get<CourseOffering[]>(this.courseOfferingsApi)
      .subscribe({

        next: (data) => {

          console.log('COURSE OFFERINGS:', data);

          this.courseOfferings = data || [];

          this.updateQualificationTypes();
          this.updateAcademicFields();
          this.updateFilterOptions();

        },

        error: (error) => {

          console.error('Course Offerings API error:', error);

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
          .map(university => university.universityType)
          .filter((type): type is string => !!type)
      )
    ];

  }


  /* =========================================================
     CITIES
  ========================================================= */

  updateAvailableCities(): void {

    let universitiesForCities = [...this.universities];

    if (this.selectedProvince) {

      universitiesForCities = universitiesForCities.filter(
        university =>
          university.province?.toLowerCase() ===
          this.selectedProvince.toLowerCase()
      );

    }

    const cities = universitiesForCities
      .map(university => university.city)
      .filter((city): city is string => !!city)
      .map(city => city.trim())
      .filter(city => city.length > 0);

    this.availableCities = [...new Set(cities)].sort();

  }


  /* =========================================================
     QUALIFICATION TYPES
  ========================================================= */

  updateQualificationTypes(): void {

    const universityIds = new Set(
      this.universities.map(
        university => Number(university.universityID)
      )
    );

    const universityCourseIds = new Set(
      this.courseOfferings
        .filter(offering =>
          universityIds.has(Number(offering.universityID))
        )
        .map(offering => Number(offering.courseID))
    );

    this.qualificationTypes = [
      ...new Set(
        this.courses
          .filter(course =>
            universityCourseIds.has(Number(course.courseID))
          )
          .map(course => course.qualificationType?.trim())
          .filter((type): type is string => !!type)
      )
    ].sort((a, b) => a.localeCompare(b));

    if (
      this.selectedQualification &&
      !this.qualificationTypes.includes(this.selectedQualification)
    ) {

      this.selectedQualification = '';

    }

  }


  /* =========================================================
     ACADEMIC FIELDS
  ========================================================= */

  updateAcademicFields(): void {

    console.log('UNIVERSITIES:', this.universities.length);
    console.log('COURSES:', this.courses.length);
    console.log('COURSE OFFERINGS:', this.courseOfferings.length);

    console.log(
      'COURSES WITH ACADEMIC FIELDS:',
      this.courses.filter(course => course.academicField)
    );

    const universityIds = new Set(
      this.universities.map(
        university => Number(university.universityID)
      )
    );

    const universityCourseIds = new Set(
      this.courseOfferings
        .filter(offering =>
          universityIds.has(Number(offering.universityID))
        )
        .map(offering => Number(offering.courseID))
    );

    this.academicFields = [
      ...new Set(
        this.courses
          .filter(course =>
            universityCourseIds.has(Number(course.courseID))
          )
          .map(course => course.academicField?.trim())
          .filter((field): field is string => !!field)
      )
    ].sort((a, b) => a.localeCompare(b));

    console.log('AVAILABLE ACADEMIC FIELDS:', this.academicFields);

    if (
      this.selectedAcademicField &&
      !this.academicFields.includes(this.selectedAcademicField)
    ) {

      this.selectedAcademicField = '';

    }

  }


  /* =========================================================
     UPDATE ALL FILTER OPTIONS
  ========================================================= */

  updateFilterOptions(): void {

    this.updateAvailableCities();
    this.updateAvailableCourses();

  }


  /* =========================================================
     FACULTY OPTIONS
  ========================================================= */

  updateAvailableFaculties(): void {

    let validOfferings = [...this.courseOfferings];

    if (this.selectedProvince) {

      const universityIDs = this.universities
        .filter(university =>
          university.province?.toLowerCase() ===
          this.selectedProvince.toLowerCase()
        )
        .map(university => university.universityID);

      validOfferings = validOfferings.filter(
        offering =>
          universityIDs.includes(offering.universityID)
      );

    }

    if (this.selectedCity) {

      const universityIDs = this.universities
        .filter(university =>
          university.city?.toLowerCase() ===
          this.selectedCity.toLowerCase()
        )
        .map(university => university.universityID);

      validOfferings = validOfferings.filter(
        offering =>
          universityIDs.includes(offering.universityID)
      );

    }

    if (this.selectedCourse) {

      const courseID = Number(this.selectedCourse);

      validOfferings = validOfferings.filter(
        offering => offering.courseID === courseID
      );

    }

    if (this.selectedQualification) {

      const courseIDs = this.courses
        .filter(course =>
          course.qualificationType === this.selectedQualification
        )
        .map(course => course.courseID);

      validOfferings = validOfferings.filter(
        offering =>
          courseIDs.includes(offering.courseID)
      );

    }

    const facultyIDs = [
      ...new Set(
        validOfferings.map(offering => offering.facultyID)
      )
    ];

    this.availableFaculties = this.faculties.filter(
      faculty =>
        facultyIDs.includes(faculty.facultyID)
    );

  }


  /* =========================================================
     COURSE OPTIONS
  ========================================================= */

  updateAvailableCourses(): void {

    let validOfferings = [...this.courseOfferings];

    if (this.selectedProvince) {

      const universityIDs = this.universities
        .filter(university =>
          university.province?.toLowerCase() ===
          this.selectedProvince.toLowerCase()
        )
        .map(university => university.universityID);

      validOfferings = validOfferings.filter(
        offering =>
          universityIDs.includes(offering.universityID)
      );

    }

    if (this.selectedCity) {

      const universityIDs = this.universities
        .filter(university =>
          university.city?.toLowerCase() ===
          this.selectedCity.toLowerCase()
        )
        .map(university => university.universityID);

      validOfferings = validOfferings.filter(
        offering =>
          universityIDs.includes(offering.universityID)
      );

    }

    if (this.selectedAcademicField) {

      const courseIDs = this.courses
        .filter(course =>
          course.academicField === this.selectedAcademicField
        )
        .map(course => course.courseID);

      validOfferings = validOfferings.filter(
        offering =>
          courseIDs.includes(offering.courseID)
      );

    }

    if (this.selectedQualification) {

      const courseIDs = this.courses
        .filter(course =>
          course.qualificationType === this.selectedQualification
        )
        .map(course => course.courseID);

      validOfferings = validOfferings.filter(
        offering =>
          courseIDs.includes(offering.courseID)
      );

    }

    const courseIDs = [
      ...new Set(
        validOfferings.map(offering => offering.courseID)
      )
    ];

    this.availableCourses = this.courses.filter(
      course =>
        courseIDs.includes(course.courseID)
    );

  }


  /* =========================================================
     FILTERED UNIVERSITIES
  ========================================================= */

  get filteredUniversities(): University[] {

    const search = this.searchTerm.toLowerCase().trim();

    const selectedAcademicField = this.selectedAcademicField;

    const selectedCourseID = this.selectedCourse
      ? Number(this.selectedCourse)
      : null;

    return this.universities.filter(university => {

      const matchesSearch =
        !search ||
        university.universityName?.toLowerCase().includes(search) ||
        university.abbreviation?.toLowerCase().includes(search) ||
        university.city?.toLowerCase().includes(search) ||
        university.province?.toLowerCase().includes(search);

      const matchesProvince =
        !this.selectedProvince ||
        university.province?.toLowerCase() ===
        this.selectedProvince.toLowerCase();

      const matchesCity =
        !this.selectedCity ||
        university.city?.toLowerCase() ===
        this.selectedCity.toLowerCase();

      const matchesUniversityType =
        !this.selectedUniversityType ||
        university.universityType === this.selectedUniversityType;

      const universityOfferings = this.courseOfferings.filter(
        offering =>
          offering.universityID === university.universityID
      );

      const matchesAcademicField =
        !selectedAcademicField ||
        universityOfferings.some(offering => {

          const course = this.courses.find(
            c => c.courseID === offering.courseID
          );

          return course?.academicField === selectedAcademicField;

        });

      const matchesCourse =
        !selectedCourseID ||
        universityOfferings.some(
          offering =>
            offering.courseID === selectedCourseID
        );

      const matchesQualification =
        !this.selectedQualification ||
        universityOfferings.some(offering => {

          const course = this.courses.find(
            c => c.courseID === offering.courseID
          );

          return course?.qualificationType === this.selectedQualification;

        });

      return (
        matchesSearch &&
        matchesProvince &&
        matchesCity &&
        matchesUniversityType &&
        matchesAcademicField &&
        matchesCourse &&
        matchesQualification
      );

    });

  }


  /* =========================================================
     PROVINCE CHANGE
  ========================================================= */

  onProvinceChange(): void {

    this.updateAvailableCities();

    if (
      this.selectedCity &&
      !this.availableCities.some(
        city =>
          city.toLowerCase() === this.selectedCity.toLowerCase()
      )
    ) {

      this.selectedCity = '';

    }

    this.updateAvailableCourses();

    if (
      this.selectedCourse &&
      !this.availableCourses.some(
        course =>
          course.courseID === Number(this.selectedCourse)
      )
    ) {

      this.selectedCourse = '';

    }

    this.updateAvailableCourses();

  }


  /* =========================================================
     CITY CHANGE
  ========================================================= */

  onCityChange(): void {

    this.updateAvailableCourses();

    if (
      this.selectedCourse &&
      !this.availableCourses.some(
        course =>
          course.courseID === Number(this.selectedCourse)
      )
    ) {

      this.selectedCourse = '';

    }

    this.updateAvailableCourses();

  }


  /* =========================================================
     ACADEMIC FIELD CHANGE
  ========================================================= */

  onAcademicFieldChange(): void {

    // Reset the selected course when the academic field changes.
    this.selectedCourse = '';

    // Update the courses based on the selected academic field.
    this.updateAvailableCourses();

  }


  /* =========================================================
     COURSE CHANGE
  ========================================================= */

  onCourseChange(): void {

    if (
      this.selectedCourse &&
      this.selectedAcademicField
    ) {

      const selectedCourse = this.courses.find(
        course =>
          course.courseID === Number(this.selectedCourse)
      );

      if (
        selectedCourse?.academicField !== this.selectedAcademicField
      ) {

        this.selectedAcademicField = '';

      }

    }

    this.updateAcademicFields();
    this.updateAvailableCourses();

  }


  /* =========================================================
     QUALIFICATION CHANGE
  ========================================================= */

  onQualificationChange(): void {

    this.updateAvailableCourses();

  }


  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  clearFilters(): void {

    this.searchTerm = '';
    this.selectedProvince = '';
    this.selectedCity = '';
    this.selectedAcademicField = '';
    this.selectedCourse = '';
    this.selectedQualification = '';
    this.selectedUniversityType = '';

    this.availableCities = [
      ...new Set(
        this.universities
          .map(university => university.city)
          .filter((city): city is string => !!city)
          .map(city => city.trim())
          .filter(city => city.length > 0)
      )
    ].sort();

    this.availableCourses = [...this.courses];

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
      this.selectedAcademicField ||
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
