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
import { Location } from '@angular/common';
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
  schoolOutline,
  locationOutline,
  businessOutline,
  bookOutline,
  calendarOutline,
  globeOutline,
  starOutline,
  star
} from 'ionicons/icons';
import { Auth } from '../../services/auth';
import { SavedService } from '../../services/saved.service';
import { AccessibilityControlsComponent } from '../../components/accessibility-controls/accessibility-controls.component';

interface University {
  universityID: number;
  universityName: string;
  abbreviation?: string | null;
  description?: string | null;
  province?: string | null;
  city?: string | null;
  institutionType?: string | null;
  universityType?: string | null;
  websiteURL?: string | null;
  faculties?: any[] | null;
  courseOfferings?: any[] | null;
  pinnedUniversities?: any[] | null;
  universityFundings?: any[] | null;
  importantDates?: any[] | null;

}

@Component({

  selector: 'app-university-details',
  templateUrl: './university-details.page.html',
  styleUrls: ['./university-details.page.scss'],
  standalone: true,

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
    AccessibilityControlsComponent
  ]

})


export class UniversityDetailsPage implements OnInit {


  university: University | null = null;
  universityId: number | null = null;
  loading = true;
  error = false;

  /*
   * Stores the IDs of courses that
   * the logged-in user has saved.
   */
  savedCourseIds = new Set<number>();

  /*
   * Stores the course currently being
   * saved or removed.
   *
   * This prevents double-clicking.
   */
  savingCourseId: number | null = null;


  private readonly apiUrl =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/Universities';


  constructor(

    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location,
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
      'school-outline':
        schoolOutline,
      'location-outline':
        locationOutline,
      'business-outline':
        businessOutline,
      'book-outline':
        bookOutline,
      'calendar-outline':
        calendarOutline,
      'globe-outline':
        globeOutline,
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
      'University Details Page Initialising...'
    );


    const id =
      this.route.snapshot.paramMap.get('id');


    console.log(
      'DETAILS PAGE ID:',
      id
    );


    if (!id) {


      console.error(
        'NO UNIVERSITY ID FOUND'
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
        'INVALID UNIVERSITY ID:',
        id
      );


      this.loading = false;

      this.error = true;


      this.refreshPage();


      return;

    }


    this.universityId =
      parsedId;


    this.loadUniversity();

  }


  // =========================================
  // LOAD UNIVERSITY
  // =========================================

  loadUniversity(): void {


    if (
      this.universityId === null
    ) {

      console.error(
        'UNIVERSITY ID IS NULL'
      );

      return;

    }


    const url =
      `${this.apiUrl}/${this.universityId}`;


    console.log(
      'REQUESTING UNIVERSITY:',
      url
    );


    this.loading = true;

    this.error = false;

    this.university = null;


    this.refreshPage();


    this.http
      .get<University>(url)
      .subscribe({

        next: (data) => {


          console.log(
            'UNIVERSITY DATA RECEIVED:',
            data
          );


          if (!data) {


            console.error(
              'EMPTY UNIVERSITY RESPONSE'
            );


            this.university = null;

            this.loading = false;

            this.error = true;


            this.refreshPage();


            return;

          }


          this.university =
            data;


          this.loading =
            false;


          this.error =
            false;


          console.log(
            'UNIVERSITY DISPLAY READY:',
            this.university.universityName
          );


          /*
           * Load the user's saved courses
           * after the university data is ready.
           */
          this.loadSavedCourses();


          /*
           * Force Angular to update
           * the visible page.
           */
          this.refreshPage();


        },


        error: (err) => {


          console.error(
            'UNIVERSITY DETAILS API ERROR:',
            err
          );


          this.university = null;

          this.loading = false;

          this.error = true;


          this.refreshPage();

        }

      });

  }


  // =========================================
  // LOAD SAVED COURSES
  // =========================================

  loadSavedCourses(): void {

    const user =
      this.auth.getUser();

    const token =
      this.auth.getToken();


    console.log(
      '========== SAVED COURSES =========='
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
     * A visitor can still view
     * university details and courses.
     *
     * They simply cannot save courses
     * until they log in.
     */
    if (!user || !token) {

      console.log(
        'No logged-in user. Skipping saved courses.'
      );

      this.savedCourseIds.clear();

      return;

    }


    this.savedService
      .getSavedCourses()
      .subscribe({

        next: (data) => {

          console.log(
            'SAVED COURSES:',
            data
          );


          this.savedCourseIds.clear();


          if (!Array.isArray(data)) {

            console.log(
              'Saved courses response is not an array.'
            );

            return;

          }


          data.forEach((item: any) => {

            /*
             * Support different possible
             * response structures from the API.
             */

            const courseId =
              item?.courseID ??
              item?.CourseID ??
              item?.courseId ??
              item?.CourseId ??
              item?.course?.courseID ??
              item?.course?.CourseID ??
              item?.Course?.courseID ??
              item?.Course?.CourseID;


            if (courseId != null) {

              this.savedCourseIds.add(
                Number(courseId)
              );

            }

          });


          console.log(
            'SAVED COURSE IDS:',
            [...this.savedCourseIds]
          );


          this.refreshPage();

        },


        error: (error) => {

          console.error(
            'Saved courses error:',
            error
          );

        }

      });

  }


  viewCourseDetails(course: any): void {

  console.log('========== VIEW COURSE CLICKED ==========');
  console.log('FULL COURSE/OFFERING OBJECT:', course);

  const courseId =
    course?.courseID ??
    course?.CourseID ??
    course?.courseId ??
    course?.CourseId ??
    course?.course?.courseID ??
    course?.course?.CourseID ??
    course?.course?.courseId ??
    course?.course?.CourseId ??
    course?.Course?.courseID ??
    course?.Course?.CourseID ??
    course?.Course?.courseId ??
    course?.Course?.CourseId;

  console.log('COURSE ID FOUND:', courseId);

  if (!courseId) {

    console.error(
      'NO COURSE ID FOUND IN COURSE OFFERING:',
      course
    );

    return;

  }

  this.router.navigate([
    '/tabs/course-details',
    courseId
  ]);

}

  // =========================================
  // GET COURSE ID
  // =========================================

  getCourseId(course: any): number {

    return Number(

      course?.courseID ??

      course?.CourseID ??

      course?.courseId ??

      course?.CourseId ??

      course?.course?.courseID ??

      course?.course?.CourseID ??

      course?.Course?.courseID ??

      course?.Course?.CourseID ??

      0

    );

  }


  // =========================================
  // CHECK IF COURSE IS SAVED
  // =========================================

  isCourseSaved(
    course: any
  ): boolean {

    const courseId =
      this.getCourseId(course);


    return (
      courseId > 0 &&
      this.savedCourseIds.has(courseId)
    );

  }


  // =========================================
  // SAVE / REMOVE COURSE
  // =========================================

  toggleCourseSave(
    course: any
  ): void {

    const courseId =
      this.getCourseId(course);


    console.log(
      '========== COURSE STAR CLICKED =========='
    );


    console.log(
      'COURSE:',
      course
    );


    console.log(
      'COURSE ID:',
      courseId
    );


    /*
     * Make sure we actually have
     * a valid CourseID.
     */
    if (!courseId) {

      console.error(
        'Could not determine course ID.'
      );

      return;

    }


    const user =
      this.auth.getUser();

    const token =
      this.auth.getToken();


    console.log(
      'USER:',
      user
    );


    console.log(
      'TOKEN EXISTS:',
      !!token
    );


    // =========================================
    // USER NOT LOGGED IN
    // =========================================

    if (!user || !token) {

      console.log(
        'User must log in before saving a course.'
      );


      this.router.navigate([
        '/login'
      ]);


      return;

    }


    console.log(
      'Logged-in user confirmed:',
      user.userID
    );


    // =========================================
    // PREVENT DOUBLE CLICK
    // =========================================

    if (
      this.savingCourseId !== null
    ) {

      return;

    }


    this.savingCourseId =
      courseId;


    // =========================================
    // REMOVE COURSE
    // =========================================

    if (
      this.isCourseSaved(course)
    ) {

      console.log(
        'Removing course:',
        courseId
      );


      this.savedService
        .removeCourse(courseId)
        .subscribe({

          next: () => {

            console.log(
              'Course removed from saved items:',
              courseId
            );


            this.savedCourseIds.delete(
              courseId
            );


            this.savingCourseId =
              null;


            this.refreshPage();

          },


          error: (error) => {

            console.error(
              'Remove course error:',
              error
            );


            this.savingCourseId =
              null;

          }

        });


      return;

    }

    // =========================================
    // SAVE COURSE
    // =========================================

    console.log(
      'Saving course:',
      courseId
    );

    this.savedService
      .saveCourse(courseId)
      .subscribe({

        next: (response) => {

          console.log(
            'Course saved:',
            courseId
          );

          console.log(
            'SAVE COURSE RESPONSE:',
            response
          );

          this.savedCourseIds.add(
            courseId
          );

          this.savingCourseId =
            null;


          this.refreshPage();

        },

        error: (error) => {

          console.error(
            'Save course error:',
            error
          );

          this.savingCourseId =
            null;

        }

      });

  }


  // =========================================
  // FORCE PAGE REFRESH
  // =========================================

  private refreshPage(): void {

    setTimeout(() => {

      this.changeDetector.detectChanges();

    });

  }


  // =========================================
  // RETRY
  // =========================================

  retry(): void {

    console.log(
      'Retrying university details...'
    );

    this.loadUniversity();

  }


  // =========================================
  // BACK
  // =========================================

  goBack(): void {

    console.log(
      'GOING BACK'
    );

    this.location.back();

  }

  // =========================================
  // WEBSITE
  // =========================================

  openWebsite(): void {

    if (
      !this.university ||
      !this.university.websiteURL
    ) {

      return;

    }

    let website =
      this.university.websiteURL.trim();


    if (!website) {

      return;

    }

    if (
      !website.startsWith('http://') &&
      !website.startsWith('https://')
    ) {

      website =
        `https://${website}`;

    }

    window.open(
      website,
      '_blank',
      'noopener,noreferrer'
    );

  }

}