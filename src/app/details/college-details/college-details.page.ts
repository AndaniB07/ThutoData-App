import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { HttpClient } from '@angular/common/http';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  IonContent,
  IonIcon
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  locationOutline,
  schoolOutline,
  globeOutline,
  businessOutline,
  bookOutline,
  calendarOutline,
  chevronForwardOutline
} from 'ionicons/icons';

import {
  AccessibilityControlsComponent
} from '../../components/accessibility-controls/accessibility-controls.component';


/* =========================================================
   COLLEGE
========================================================= */

interface College {

  universityID: number;

  universityName: string;

  abbreviation?: string | null;

  description?: string | null;

  province?: string | null;

  city?: string | null;

  institutionType?: string | null;

  universityType?: string | null;

  websiteURL?: string | null;

}


/* =========================================================
   COURSE OFFERING
========================================================= */

interface CourseOffering {
  offeringID: number;
  courseID: number;
  universityID: number;
  facultyID?: number | null;
  apsRequirement?: number | null;
  subjectRequirements?: string | null;
  admissionRequirements?: string | null;
  applicationInformation?: string | null;
  applicationURL?: string | null;
  faculty?: any;
}


/* =========================================================
   COURSE
========================================================= */

interface Course {

  courseID: number;

  courseName: string;

  courseCode?: string | null;

  qualificationType?: string | null;

  description?: string | null;

  durationYears?: number | null;

  studyLevel?: string | null;

  minimumAPS?: number | null;

  entryRequirements?: string | null;

  careerOpportunities?: string | null;

  offering?: CourseOffering;

}


/* =========================================================
   COMPONENT
========================================================= */

@Component({

  selector: 'app-college-details',

  templateUrl: './college-details.page.html',

  styleUrls: ['./college-details.page.scss'],

  standalone: true,

  imports: [

    CommonModule,

    IonContent,

    IonIcon,

    AccessibilityControlsComponent

  ]

})


export class CollegeDetailsPage
  implements OnInit {


  /* =========================================================
     COLLEGE
  ========================================================= */

  college!: College;

  collegeId: number | null = null;


  /* =========================================================
     COURSES
  ========================================================= */

  courses: Course[] = [];

  courseOfferings: CourseOffering[] = [];

  coursesLoading = true;

  coursesError = false;


  /* =========================================================
     PAGE STATE
  ========================================================= */

  loading = true;

  error = false;


  /* =========================================================
     API URLS
  ========================================================= */

  private readonly universitiesApi =

    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/Universities';


  private readonly coursesApi =

    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/Courses';


  private readonly courseOfferingsApi =

    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/CourseOfferings';


  /* =========================================================
     CONSTRUCTOR
  ========================================================= */

  constructor(

    private http: HttpClient,

    private route: ActivatedRoute,

    private router: Router,

    private changeDetector: ChangeDetectorRef

  ) {

    addIcons({

      arrowBackOutline,

      locationOutline,

      schoolOutline,

      globeOutline,

      businessOutline,

      bookOutline,

      calendarOutline,

      chevronForwardOutline

    });

  }


  /* =========================================================
     INITIALISE
  ========================================================= */

  ngOnInit(): void {

    console.log(
      'College Details Page Initialising...'
    );


    const id =
      this.route.snapshot.paramMap.get('id');


    console.log(
      'COLLEGE DETAILS ID:',
      id
    );


    if (!id) {

      console.error(
        'NO COLLEGE ID FOUND'
      );

      this.loading = false;

      this.error = true;

      return;

    }


    const parsedId = Number(id);


    if (isNaN(parsedId)) {

      console.error(
        'INVALID COLLEGE ID:',
        id
      );

      this.loading = false;

      this.error = true;

      return;

    }


    this.collegeId = parsedId;


    this.loadCollege();

  }


  /* =========================================================
     LOAD COLLEGE
  ========================================================= */

  loadCollege(): void {

    if (this.collegeId === null) {

      return;

    }


    const url =

      `${this.universitiesApi}/${this.collegeId}`;


    console.log(
      'REQUESTING COLLEGE:',
      url
    );


    this.loading = true;

    this.error = false;


    this.http

      .get<College>(url)

      .subscribe({

        next: (data) => {

          console.log(
            'COLLEGE DATA RECEIVED:',
            data
          );


          this.college = data;


          this.loading = false;

          this.error = false;


          /*
           * Once the college is loaded,
           * load its courses.
           */

          this.loadCourses();


          this.refreshPage();


          console.log(
            'COLLEGE DISPLAY READY:',
            this.college.universityName
          );

        },


        error: (err) => {

          console.error(
            'COLLEGE DETAILS API ERROR:',
            err
          );


          this.loading = false;

          this.error = true;


          this.refreshPage();

        }

      });

  }


  /* =========================================================
     LOAD COURSES
  ========================================================= */

  loadCourses(): void {

    if (this.collegeId === null) {

      this.coursesLoading = false;

      return;

    }


    this.coursesLoading = true;

    this.coursesError = false;

    this.courses = [];

    this.courseOfferings = [];


    console.log(
      '========== LOADING COLLEGE COURSES =========='
    );


    /*
     * STEP 1:
     * Get all course offerings.
     */

    this.http

      .get<CourseOffering[]>(
        this.courseOfferingsApi
      )

      .subscribe({

        next: (offeringsData) => {

          console.log(
            'ALL COURSE OFFERINGS:',
            offeringsData
          );


          const allOfferings =
            Array.isArray(offeringsData)
              ? offeringsData
              : [];


          /*
           * STEP 2:
           * Keep only offerings belonging
           * to this college.
           */

          this.courseOfferings =
            allOfferings.filter(

              offering =>

                Number(
                  offering.universityID
                ) ===
                Number(
                  this.collegeId
                )

            );


          console.log(
            'COURSE OFFERINGS FOR COLLEGE:',
            this.courseOfferings
          );


          /*
           * STEP 3:
           * Load all courses so we can match
           * courseID to course details.
           */

          this.loadCourseDetails();

        },


        error: (error) => {

          console.error(
            'COURSE OFFERINGS API ERROR:',
            error
          );


          this.courses = [];

          this.courseOfferings = [];

          this.coursesLoading = false;

          this.coursesError = true;


          this.refreshPage();

        }

      });

  }


  /* =========================================================
     LOAD COURSE DETAILS
  ========================================================= */

private loadCourseDetails(): void {

  if (this.courseOfferings.length === 0) {
    this.courses = [];
    this.coursesLoading = false;
    return;
  }

  console.log('========== LOADING COURSE DETAILS ==========');

  this.http
    .get<any[]>(this.coursesApi)
    .subscribe({

      next: (allCourses) => {

        console.log(
          'ALL COURSES:',
          allCourses
        );

        const courseMap = new Map<number, any>();

        allCourses.forEach((course) => {

          const courseId = Number(
            course.courseID
          );

          if (!isNaN(courseId)) {
            courseMap.set(
              courseId,
              course
            );
          }

        });

        const matchedCourses: Course[] = [];

        this.courseOfferings.forEach((offering) => {

          const course = courseMap.get(
            Number(offering.courseID)
          );

          if (!course) {
            return;
          }

          matchedCourses.push({
            courseID: Number(course.courseID),
            courseName: course.courseName,
            courseCode: course.courseCode ?? null,
            qualificationType:
              course.qualificationType ?? null,
            description:
              course.description ?? null,
            durationYears:
              course.durationYears ?? null,
            studyLevel:
              course.studyLevel ?? null,
            minimumAPS:
              course.minimumAPS ?? null,
            entryRequirements:
              course.entryRequirements ?? null,
            careerOpportunities:
              course.careerOpportunities ?? null,
            offering: offering
          });

        });

        // Remove duplicate courses
        const uniqueCourses =
          new Map<number, Course>();

        matchedCourses.forEach((course) => {

          if (
            !uniqueCourses.has(course.courseID)
          ) {
            uniqueCourses.set(
              course.courseID,
              course
            );
          }

        });

        this.courses =
          Array.from(uniqueCourses.values());

        console.log(
          'COURSES FOR THIS COLLEGE:',
          this.courses
        );

        this.coursesLoading = false;
        this.coursesError = false;

        this.refreshPage();
      },

      error: (err) => {

        console.error(
          'COURSES API ERROR:',
          err
        );

        this.courses = [];
        this.coursesLoading = false;
        this.coursesError = true;

        this.refreshPage();
      }

    });

}

  /* =========================================================
     RETRY
  ========================================================= */

  retry(): void {

    this.loadCollege();

  }


  /* =========================================================
     REFRESH PAGE
  ========================================================= */

  private refreshPage(): void {

    setTimeout(() => {

      this.changeDetector.detectChanges();

    });

  }


  /* =========================================================
     BACK
  ========================================================= */

goBack(): void {
  console.log('GOING BACK TO COLLEGES');

  const activeElement = document.activeElement as HTMLElement;
  activeElement?.blur();

  this.router.navigate([
    '/tabs/colleges'
  ]);
}


  /* =========================================================
     OPEN COURSE
  ========================================================= */

  viewCourse(courseId: number): void {

    console.log(
      'Opening course:',
      courseId
    );


    this.router.navigate([
      '/tabs/course-details',
      courseId
    ]);

  }


  /* =========================================================
     OPEN WEBSITE
  ========================================================= */

  openWebsite(): void {

    if (

      this.college &&

      this.college.websiteURL

    ) {

      window.open(

        this.college.websiteURL,

        '_blank',

        'noopener,noreferrer'

      );

    }

  }

}