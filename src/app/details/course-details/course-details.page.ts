import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { HttpClient } from '@angular/common/http';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonSpinner
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  informationCircleOutline,
  bookOutline,
  schoolOutline,
  businessOutline,
  briefcaseOutline,
  timeOutline,
  chevronForwardOutline,
  starOutline,
  star
} from 'ionicons/icons';

import {FooterComponent} from "../../components/footer/footer.component";
import { Auth } from '../../services/auth';
import { SavedService } from '../../services/saved.service';
import { AccessibilityControlsComponent } from '../../components/accessibility-controls/accessibility-controls.component';


// =========================================
// UNIVERSITY
// =========================================

interface University {

  universityID: number;

  universityName: string;

  abbreviation?: string | null;

  province?: string | null;

  city?: string | null;

  institutionType?: string | null;

  universityType?: string | null;

}


// =========================================
// COURSE OFFERING
// =========================================

interface CourseOffering {
  offeringID: number;
  courseID: number;
  universityID: number;
  facultyID: number;
  apsRequirement: number;
  subjectRequirements: string | null;
  admissionRequirements: string | null;
  applicationInformation: string | null;
  applicationURL: string | null;
  course: any;
  university: University | null;
  faculty: any;
  universityName?: string;
  UniversityName?: string;
  facultyName?: string;
  FacultyName?: string;

}


// =========================================
// COURSE
// =========================================

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
  pinnedCourses?: any[];
  courseCareers?: any[];

}


@Component({
  selector: 'app-course-details',
  standalone: true,
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],

  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonSpinner,
    FooterComponent,
    AccessibilityControlsComponent

  ]

})


export class CourseDetailsPage
  implements OnInit {


  // =========================================
  // PAGE DATA
  // =========================================

  course: Course | null = null;

  courseId: number | null = null;

  loading = true;

  error = false;


  // =========================================
  // SAVED COURSE
  // =========================================

  saved = false;

  saving = false;


  // =========================================
  // API URLS
  // =========================================

  private readonly apiUrl =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/Courses';

  private readonly offeringsUrl =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/CourseOfferings';

  private readonly universitiesUrl =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/Universities';


  // =========================================
  // CONSTRUCTOR
  // =========================================

  constructor(

    private http: HttpClient,

    private route: ActivatedRoute,

    private router: Router,

    private auth: Auth,

    private savedService: SavedService,

    private changeDetector: ChangeDetectorRef

  ) {


    addIcons({

      'arrow-back-outline':
        arrowBackOutline,

      'information-circle-outline':
        informationCircleOutline,

      'book-outline':
        bookOutline,

      'school-outline':
        schoolOutline,

      'business-outline':
        businessOutline,

      'briefcase-outline':
        briefcaseOutline,

      'time-outline':
        timeOutline,

      'chevron-forward-outline':
        chevronForwardOutline,

      'star-outline':
        starOutline,

      'star':
        star

    });

  }


  // =========================================
  // INITIALISE
  // =========================================

  ngOnInit(): void {


    console.log(
      '========================================'
    );

    console.log(
      'COURSE DETAILS PAGE INITIALISING'
    );

    console.log(
      '========================================'
    );


    const id =
      this.route.snapshot.paramMap.get('id');


    console.log(
      'COURSE DETAILS ID:',
      id
    );


    // =========================================
    // CHECK ID
    // =========================================

    if (!id) {

      console.error(
        'NO COURSE ID FOUND'
      );

      this.loading = false;

      this.error = true;

      this.refreshPage();

      return;

    }


    const parsedId =
      Number(id);


    if (

      !Number.isInteger(parsedId) ||

      parsedId <= 0

    ) {

      console.error(
        'INVALID COURSE ID:',
        id
      );

      this.loading = false;

      this.error = true;

      this.refreshPage();

      return;

    }


    this.courseId =
      parsedId;


    this.loadCourse();

  }


  // =========================================
  // LOAD COURSE
  // =========================================

  loadCourse(): void {


    if (
      this.courseId === null
    ) {

      return;

    }


    this.loading = true;

    this.error = false;

    this.course = null;


    this.refreshPage();


    const url =
      `${this.apiUrl}/${this.courseId}`;


    console.log(
      'REQUESTING COURSE:',
      url
    );


    // =========================================
    // STEP 1
    // GET COURSE
    // =========================================

    this.http
      .get<Course>(url)
      .subscribe({

        next: (courseData) => {


          console.log(
            '========================================'
          );

          console.log(
            'COURSE DATA RECEIVED'
          );

          console.log(
            courseData
          );

          console.log(
            '========================================'
          );


          if (!courseData) {

            this.loading = false;

            this.error = true;

            this.refreshPage();

            return;

          }


          // =========================================
          // STEP 2
          // GET COURSE OFFERINGS
          // =========================================

          console.log(
            'REQUESTING COURSE OFFERINGS:',
            this.offeringsUrl
          );


          this.http
            .get<CourseOffering[]>(
              this.offeringsUrl
            )
            .subscribe({

              next: (allOfferings) => {


                console.log(
                  '========================================'
                );

                console.log(
                  'ALL COURSE OFFERINGS RECEIVED'
                );

                console.log(
                  allOfferings
                );

                console.log(
                  '========================================'
                );


                const offerings =
                  Array.isArray(allOfferings)
                    ? allOfferings
                    : [];


                // =========================================
                // FIND OFFERINGS FOR THIS COURSE
                // =========================================

                const courseOfferings =
                  offerings.filter(

                    offering =>

                      Number(
                        offering.courseID
                      ) ===
                      Number(
                        this.courseId
                      )

                  );


                console.log(
                  '========================================'
                );

                console.log(
                  'OFFERINGS FOR COURSE:',
                  this.courseId
                );

                console.log(
                  courseOfferings
                );

                console.log(
                  'NUMBER OF OFFERINGS:',
                  courseOfferings.length
                );

                console.log(
                  '========================================'
                );


                // =========================================
                // STEP 3
                // GET UNIVERSITIES / COLLEGES
                // =========================================

                console.log(
                  'REQUESTING UNIVERSITIES:',
                  this.universitiesUrl
                );


                this.http
                  .get<University[]>(
                    this.universitiesUrl
                  )
                  .subscribe({

                    next: (universities) => {


                      console.log(
                        '========================================'
                      );

                      console.log(
                        'UNIVERSITIES DATA RECEIVED'
                      );

                      console.log(
                        universities
                      );

                      console.log(
                        '========================================'
                      );


                      const allUniversities =
                        Array.isArray(universities)
                          ? universities
                          : [];


                      // =========================================
                      // MATCH UNIVERSITY TO EACH OFFERING
                      // =========================================

                      const enrichedOfferings =
                        courseOfferings.map(

                          offering => {


                            const university =
                              allUniversities.find(

                                item =>

                                  Number(
                                    item.universityID
                                  ) ===
                                  Number(
                                    offering.universityID
                                  )

                              );


                            console.log(
                              '----------------------------------------'
                            );

                            console.log(
                              'OFFERING ID:',
                              offering.offeringID
                            );

                            console.log(
                              'COURSE ID:',
                              offering.courseID
                            );

                            console.log(
                              'UNIVERSITY ID:',
                              offering.universityID
                            );

                            console.log(
                              'MATCHED UNIVERSITY:',
                              university
                            );


                            return {

                              ...offering,

                              university:
                                university ?? null

                            };

                          }

                        );


                      // =========================================
                      // REMOVE DUPLICATE INSTITUTIONS
                      // =========================================

                      const uniqueOfferings =
                        enrichedOfferings.filter(

                          (offering, index, array) => {

                            const universityId =
                              offering.universityID;


                            return (

                              index ===
                              array.findIndex(

                                item =>

                                  Number(
                                    item.universityID
                                  ) ===
                                  Number(
                                    universityId
                                  )

                              )

                            );

                          }

                        );


                      console.log(
                        '========================================'
                      );

                      console.log(
                        'UNIQUE COURSE OFFERINGS'
                      );

                      console.log(
                        uniqueOfferings
                      );

                      console.log(
                        'NUMBER OF UNIQUE INSTITUTIONS:',
                        uniqueOfferings.length
                      );

                      console.log(
                        '========================================'
                      );


                      // =========================================
                      // CREATE FINAL COURSE OBJECT
                      // =========================================

                      this.course = {

                        ...courseData,

                        courseOfferings:
                          uniqueOfferings

                      };


                      console.log(
                        '========================================'
                      );

                      console.log(
                        'FINAL COURSE:'
                      );

                      console.log(
                        this.course
                      );

                      console.log(
                        '========================================'
                      );


                      this.loading = false;

                      this.error = false;


                      this.loadSavedState();


                      this.refreshPage();

                    },


                    error: (err) => {


                      console.error(
                        'UNIVERSITIES API ERROR:',
                        err
                      );


                      /*
                       * We can still display the course
                       * and its offering information.
                       */

                      this.course = {

                        ...courseData,

                        courseOfferings:
                          courseOfferings

                      };


                      this.loading = false;

                      this.error = false;


                      this.loadSavedState();


                      this.refreshPage();

                    }

                  });

              },


              error: (err) => {


                console.error(
                  'COURSE OFFERINGS API ERROR:',
                  err
                );


                this.course = {

                  ...courseData,

                  courseOfferings: []

                };


                this.loading = false;

                this.error = false;


                this.loadSavedState();


                this.refreshPage();

              }

            });

        },


        error: (err) => {


          console.error(
            'COURSE DETAILS API ERROR:',
            err
          );


          this.course = null;

          this.loading = false;

          this.error = true;


          this.refreshPage();

        }

      });

  }


  // =========================================
  // LOAD SAVED STATE
  // =========================================

  loadSavedState(): void {


    const user =
      this.auth.getUser();


    const token =
      this.auth.getToken();


    if (!user || !token) {

      this.saved = false;

      return;

    }


    this.savedService
      .getSavedCourses()
      .subscribe({

        next: (data) => {


          this.saved = false;


          if (!Array.isArray(data)) {

            return;

          }


          data.forEach(
            (item: any) => {


              const id =

                item?.courseID ??

                item?.CourseID ??

                item?.courseId ??

                item?.CourseId ??

                item?.course?.courseID ??

                item?.course?.CourseID ??

                item?.Course?.courseID ??

                item?.Course?.CourseID;


              if (

                id != null &&

                Number(id) ===
                this.courseId

              ) {

                this.saved = true;

              }

            }
          );


          this.refreshPage();

        },


        error: (err) => {


          console.error(
            'ERROR LOADING SAVED COURSE STATE:',
            err
          );

        }

      });

  }


  // =========================================
  // SAVE / REMOVE COURSE
  // =========================================

  toggleSave(): void {


    if (
      this.courseId === null
    ) {

      return;

    }


    const user =
      this.auth.getUser();


    const token =
      this.auth.getToken();


    if (!user || !token) {

      this.router.navigate([
        '/login'
      ]);

      return;

    }


    if (this.saving) {

      return;

    }


    this.saving = true;


    // =========================================
    // REMOVE
    // =========================================

    if (this.saved) {


      this.savedService
        .removeCourse(
          this.courseId
        )
        .subscribe({

          next: () => {


            this.saved = false;

            this.saving = false;


            this.refreshPage();

          },


          error: (err) => {


            console.error(
              'ERROR REMOVING COURSE:',
              err
            );


            this.saving = false;


            this.refreshPage();

          }

        });


      return;

    }


    // =========================================
    // SAVE
    // =========================================

    this.savedService
      .saveCourse(
        this.courseId
      )
      .subscribe({

        next: () => {


          this.saved = true;

          this.saving = false;


          this.refreshPage();

        },


        error: (err) => {


          console.error(
            'ERROR SAVING COURSE:',
            err
          );


          this.saving = false;


          this.refreshPage();

        }

      });

  }


  // =========================================
  // GET UNIVERSITY NAME
  // =========================================

  getUniversityName(
    offering: CourseOffering
  ): string {


    return (

      offering?.university?.universityName ||

      offering?.university?.abbreviation ||

      offering?.universityName ||

      offering?.UniversityName ||

      'University'

    );

  }


  // =========================================
  // GET INSTITUTION TYPE
  // =========================================

  getInstitutionType(
    offering: CourseOffering
  ): string {


    return (

      offering?.university?.institutionType ||

      offering?.university?.universityType ||

      'Institution'

    );

  }


  // =========================================
  // GET LOCATION
  // =========================================

  getUniversityLocation(
    offering: CourseOffering
  ): string {


    const city =
      offering?.university?.city;

    const province =
      offering?.university?.province;


    if (city && province) {

      return `${city}, ${province}`;

    }


    if (city) {

      return city;

    }


    if (province) {

      return province;

    }


    return '';

  }


  // =========================================
  // GET FACULTY NAME
  // =========================================

  getFacultyName(
    offering: CourseOffering
  ): string {


    return (

      offering?.faculty?.facultyName ||

      offering?.faculty?.FacultyName ||

      offering?.facultyName ||

      offering?.FacultyName ||

      ''

    );

  }


  // =========================================
  // OPEN UNIVERSITY
  // =========================================

  viewUniversity(
    offering: CourseOffering
  ): void {


    console.log(
      '========================================'
    );

    console.log(
      'VIEW UNIVERSITY CLICKED'
    );

    console.log(
      'OFFERING:',
      offering
    );


    const universityId =

      offering?.universityID ||

      offering?.university?.universityID;


    console.log(
      'UNIVERSITY ID:',
      universityId
    );


    if (!universityId) {

      console.error(
        'UNIVERSITY ID NOT FOUND:',
        offering
      );

      return;

    }


    this.router.navigate([

      '/tabs/university-details',

      universityId

    ]);

  }


  // =========================================
  // OPEN APPLICATION
  // =========================================

  openApplication(
    offering: CourseOffering
  ): void {


    if (
      !offering.applicationURL
    ) {

      return;

    }


    let url =
      offering.applicationURL.trim();


    if (

      !url.startsWith(
        'http://'
      ) &&

      !url.startsWith(
        'https://'
      )

    ) {

      url =
        `https://${url}`;

    }


    window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    );

  }


  // =========================================
  // RETRY
  // =========================================

  retry(): void {

    this.loadCourse();

  }


  // =========================================
  // BACK
  // =========================================

  goBack(): void {

    this.router.navigate([
      '/tabs/courses'
    ]);

  }


  // =========================================
  // REFRESH PAGE
  // =========================================

  private refreshPage(): void {

    setTimeout(() => {

      this.changeDetector.detectChanges();

    });

  }

}