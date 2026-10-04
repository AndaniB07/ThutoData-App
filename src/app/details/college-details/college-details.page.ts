import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

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
import { AccessibilityControlsComponent } from '../../components/accessibility-controls/accessibility-controls.component';

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
  faculties?: any[] | null;
  courseOfferings?: any[] | null;
  universityFundings?: any[] | null;
  importantDates?: any[] | null;
}

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
export class CollegeDetailsPage implements OnInit {

  college!: College;

  collegeId: number | null = null;

  loading = true;

  error = false;

  private readonly apiUrl =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/Universities';

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

  loadCollege(): void {

    if (this.collegeId === null) {
      return;
    }

    const url =
      `${this.apiUrl}/${this.collegeId}`;

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

  retry(): void {
    this.loadCollege();
  }

  goBack(): void {

    console.log(
      'GOING BACK TO COLLEGES'
    );

    /*
     * Remove focus from the button before
     * Ionic hides this page.
     */
    (document.activeElement as HTMLElement)?.blur();

    this.router.navigate([
      '/tabs/colleges'
    ]);
  }

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