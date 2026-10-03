import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  IonContent,
  IonIcon, ViewWillEnter
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  schoolOutline,
  locationOutline,
  trashOutline,
  chevronForwardOutline
} from 'ionicons/icons';

import { SavedService } from '../services/saved.service';
import { AccessibilityControlsComponent } from '../components/accessibility-controls/accessibility-controls.component';

@Component({
  selector: 'app-saved-universities',
  standalone: true,
  templateUrl: './saved-universities.page.html',
  styleUrls: ['./saved-universities.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    AccessibilityControlsComponent
  ]
})
export class SavedUniversitiesPage implements OnInit, ViewWillEnter {

  savedUniversities: any[] = [];

  loading = true;

  hasLoaded = false;

  error = false;

  removingUniversityId: number | null = null;

  constructor(
    private savedService: SavedService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {

    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'school-outline': schoolOutline,
      'location-outline': locationOutline,
      'trash-outline': trashOutline,
      'chevron-forward-outline': chevronForwardOutline
    });

  }

  ngOnInit(): void {

    console.log(
      '========== SAVED UNIVERSITIES PAGE =========='
    );

    this.loadSavedUniversities();

  }

  ionViewWillEnter(): void {

    console.log(
      '========== SAVED UNIVERSITIES PAGE (VIEW WILL ENTER) =========='
    );

    if (this.hasLoaded) {
      this.loadSavedUniversities();
    }

  }

  loadSavedUniversities(): void {

    console.log(
      'Loading saved universities...'
    );

    this.loading = true;
    this.error = false;

    this.savedService.getSavedUniversities().subscribe({

      next: (data) => {

        console.log(
          'SAVED UNIVERSITIES:',
          data
        );

        if (Array.isArray(data)) {

          this.savedUniversities = data;

        } else {

          this.savedUniversities = [];

        }

        console.log(
          'NUMBER OF SAVED UNIVERSITIES:',
          this.savedUniversities.length
        );

        // Data has finished loading
        this.loading = false;

        this.hasLoaded = true;

        this.refreshPage();

        console.log(
          'LOADING:',
          this.loading
        );

      },

      error: (error) => {

        console.error(
          'ERROR LOADING SAVED UNIVERSITIES:',
          error
        );

        this.savedUniversities = [];

        this.loading = false;

        this.error = true;
        
        this.refreshPage();

      }

    });

  }

  // =========================================
// FORCE PAGE REFRESH
// =========================================

private refreshPage(): void {

  setTimeout(() => {

    this.cdr.detectChanges();

  });

}
  removeUniversity(
    universityId: number
  ): void {

    if (
      this.removingUniversityId !== null
    ) {
      return;
    }

    console.log(
      'Removing saved university:',
      universityId
    );

    this.removingUniversityId =
      universityId;

    this.savedService
      .removeUniversity(universityId)
      .subscribe({

        next: () => {

          console.log(
            'University removed successfully:',
            universityId
          );

          this.savedUniversities =
            this.savedUniversities.filter(
              university =>
                this.getUniversityId(
                  university
                ) !== universityId
            );

          this.removingUniversityId =
            null;

          this.refreshPage();

        },

        error: (error) => {

          console.error(
            'ERROR REMOVING UNIVERSITY:',
            error
          );

          this.removingUniversityId =
            null;

        }

      });

  }

  getUniversityId(
    university: any
  ): number {

    return Number(

      university?.universityID ??

      university?.UniversityID ??

      university?.university
        ?.universityID ??

      university?.University
        ?.universityID ??

      university?.University
        ?.UniversityID

    );

  }

  getUniversityName(
    university: any
  ): string {

    return (

      university?.universityName ??

      university?.UniversityName ??

      university?.university
        ?.universityName ??

      university?.University
        ?.universityName ??

      university?.University
        ?.Name ??

      'University'

    );

  }

  getProvince(
    university: any
  ): string {

    return (

      university?.province ??

      university?.Province ??

      university?.university
        ?.province ??

      university?.University
        ?.Province ??

      ''

    );

  }

  getCity(
    university: any
  ): string {

    return (

      university?.city ??

      university?.City ??

      university?.university
        ?.city ??

      university?.University
        ?.City ??

      ''

    );

  }

  openUniversity(
    university: any
  ): void {

    const universityId =
      this.getUniversityId(
        university
      );

    if (!universityId) {

      console.error(
        'Could not determine university ID.'
      );

      return;

    }

    console.log(
      'Opening university:',
      universityId
    );

    this.router.navigate([
      '/tabs/university-details',
      universityId
    ]);

  }

  goBack(): void {

    this.router.navigate([
      '/tabs/profile'
    ]);

  }

  goToUniversities(): void {

    this.router.navigate([
      '/tabs/universities'
    ]);

  }

}