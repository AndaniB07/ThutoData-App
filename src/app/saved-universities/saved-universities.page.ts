import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  IonContent,
  IonIcon,
  IonSpinner
} from '@ionic/angular';

import { ViewWillEnter } from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  schoolOutline,
  locationOutline,
  trashOutline,
  chevronForwardOutline,
  bookmarkOutline,
  alertCircleOutline
} from 'ionicons/icons';

import { SavedService } from '../services/saved.service';
import { AccessibilityControlsComponent } from '../components/accessibility-controls/accessibility-controls.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-saved-universities',
  templateUrl: './saved-universities.page.html',
  styleUrls: ['./saved-universities.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    IonSpinner,
    AccessibilityControlsComponent,
    FooterComponent
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
      arrowBackOutline,
      schoolOutline,
      locationOutline,
      trashOutline,
      chevronForwardOutline,
      bookmarkOutline,
      alertCircleOutline
    });
  }

  ngOnInit(): void {
    this.loadSavedUniversities();
  }

  ionViewWillEnter(): void {
    if (this.hasLoaded) {
      this.loadSavedUniversities();
    }
  }

  // LOAD SAVED UNIVERSITIES AND COLLEGES

  loadSavedUniversities(): void {
    this.loading = true;
    this.error = false;

    this.savedService.getSavedUniversities().subscribe({
      next: (response: any) => {

        this.savedUniversities = Array.isArray(response)
          ? response
          : [];

        this.loading = false;
        this.hasLoaded = true;

        this.refreshPage();
      },

      error: (err: any) => {
        console.error('Error loading saved institutions:', err);

        this.savedUniversities = [];
        this.loading = false;
        this.error = true;
        this.hasLoaded = true;

        this.refreshPage();
      }
    });
  }

  // GET UNIVERSITY ID

  getUniversityId(university: any): number {
    return (
      university?.universityID ??
      university?.UniversityID ??
      university?.university?.universityID ??
      university?.University?.UniversityID ??
      0
    );
  }

  // GET UNIVERSITY NAME

  getUniversityName(university: any): string {
    return (
      university?.universityName ??
      university?.UniversityName ??
      university?.name ??
      university?.Name ??
      university?.university?.universityName ??
      university?.University?.UniversityName ??
      'Institution name unavailable'
    );
  }

  // GET INSTITUTION TYPE (UNIVERSITY OR COLLEGE)

  getInstitutionType(university: any): string {
    return (
      university?.institutionType ??
      university?.InstitutionType ??
      university?.university?.institutionType ??
      university?.University?.InstitutionType ??
      'Institution'
    );
  }

  // GET UNIVERSITY TYPE (PUBLIC OR PRIVATE)

  getUniversityType(university: any): string {
    return (
      university?.universityType ??
      university?.UniversityType ??
      university?.university?.universityType ??
      university?.University?.UniversityType ??
      ''
    );
  }

  // GET DESCRIPTION

  getDescription(university: any): string {
    return (
      university?.description ??
      university?.Description ??
      university?.university?.description ??
      university?.University?.Description ??
      'No description available.'
    );
  }

  // GET PROVINCE

  getProvince(university: any): string {
    return (
      university?.province ??
      university?.Province ??
      university?.university?.province ??
      university?.University?.Province ??
      ''
    );
  }

  // GET CITY

  getCity(university: any): string {
    return (
      university?.city ??
      university?.City ??
      university?.university?.city ??
      university?.University?.City ??
      ''
    );
  }

  // OPEN INSTITUTION DETAILS

  openUniversity(university: any): void {
    const id = this.getUniversityId(university);

    if (id) {
      this.router.navigate(['/tabs/university-details', id]);
    }
  }

  // REMOVE SAVED INSTITUTION

  removeUniversity(id: number): void {
    if (!id || this.removingUniversityId !== null) {
      return;
    }

    this.removingUniversityId = id;

    this.savedService.removeUniversity(id).subscribe({
      next: () => {

        this.savedUniversities = this.savedUniversities.filter(
          university => this.getUniversityId(university) !== id
        );

        this.removingUniversityId = null;

        this.refreshPage();
      },

      error: (err: any) => {
        console.error('Error removing saved institution:', err);

        this.removingUniversityId = null;

        this.refreshPage();
      }
    });
  }

  // NAVIGATION

  goBack(): void {
    this.router.navigate(['/tabs/profile']);
  }

  goToUniversities(): void {
    this.router.navigate(['/tabs/universities']);
  }

  // REFRESH VIEW

  private refreshPage(): void {
    this.cdr.detectChanges();
  }
}