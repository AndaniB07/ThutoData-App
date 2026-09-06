import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
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
  locationOutline,
  schoolOutline,
  chevronForwardOutline,
  closeOutline
} from 'ionicons/icons';

import { FooterComponent } from '../components/footer/footer.component';

interface College {
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

@Component({
  selector: 'app-colleges',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonContent,
    IonIcon,
    FooterComponent
  ],

  templateUrl: './colleges.page.html',
  styleUrls: ['./colleges.page.scss']
})
export class CollegesPage implements OnInit {

  private apiUrl = 'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/Universities';

  // =========================
  // SEARCH
  // =========================

  searchTerm = '';


  // =========================
  // FILTERS
  // =========================

  selectedProvince = '';

  selectedCity = '';

  selectedCollegeType = '';


  // =========================
  // COLLEGE DATA
  // =========================

  colleges: College[] = [];


  // =========================
  // FILTER OPTIONS
  // =========================

  availableProvinces: string[] = [];

  availableCities: string[] = [];

  availableCollegeTypes: string[] = [];


  // =========================
  // STATE
  // =========================

  loading = true;

  errorMessage = '';


  constructor(private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {

    addIcons({
      searchOutline,
      filterOutline,
      locationOutline,
      schoolOutline,
      chevronForwardOutline,
      closeOutline
    });

  }


  // =========================
  // PAGE LOAD
  // =========================

  ngOnInit(): void {

    this.loadColleges();

  }


  // =========================
  // LOAD COLLEGES
  // =========================

  loadColleges(): void {

    this.loading = true;

    this.errorMessage = '';

    this.http.get<College[]>(this.apiUrl).subscribe({

      next: (data) => {

        console.log('========== COLLEGES API ==========');
        console.log('RAW DATA:', data);
        console.log('IS ARRAY:', Array.isArray(data));
        console.log('TOTAL RECORDS:', data?.length);


        // Only keep colleges
        this.colleges = data.filter(
          institution =>
            institution.institutionType?.toLowerCase() === 'college'
        );


        console.log('TOTAL COLLEGES:', this.colleges.length);


        // Build filter options from actual API data
        this.buildFilterOptions();


        this.loading = false;

        this.cdr.detectChanges();
      },


      error: (error) => {

        console.error('College API error:', error);

        this.errorMessage =
          'Unable to load colleges. Please reload the page.';

        this.colleges = [];

        this.loading = false;

      }

    });

  }


  // =========================
  // BUILD FILTER OPTIONS
  // =========================

  buildFilterOptions(): void {

    // Provinces
    this.availableProvinces = [
      ...new Set(
        this.colleges
          .map(college => college.province)
          .filter(
            (province): province is string =>
              !!province
          )
      )
    ].sort();


    // Cities
    this.availableCities = [
      ...new Set(
        this.colleges
          .map(college => college.city)
          .filter(
            (city): city is string =>
              !!city
          )
      )
    ].sort();


    // College types
    this.availableCollegeTypes = [
      ...new Set(
        this.colleges
          .map(college => college.universityType)
          .filter(
            (type): type is string =>
              !!type
          )
      )
    ].sort();

  }


  // =========================
  // FILTERED COLLEGES
  // =========================

  get filteredColleges(): College[] {

    const search = this.searchTerm
      .toLowerCase()
      .trim();


    return this.colleges.filter(college => {

      // SEARCH
      const matchesSearch =
        !search ||

        college.universityName
          ?.toLowerCase()
          .includes(search) ||

        college.city
          ?.toLowerCase()
          .includes(search) ||

        college.province
          ?.toLowerCase()
          .includes(search) ||

        college.abbreviation
          ?.toLowerCase()
          .includes(search);


      // PROVINCE
      const matchesProvince =
        !this.selectedProvince ||
        college.province === this.selectedProvince;


      // CITY
      const matchesCity =
        !this.selectedCity ||
        college.city === this.selectedCity;


      // COLLEGE TYPE
      const matchesCollegeType =
        !this.selectedCollegeType ||
        college.universityType === this.selectedCollegeType;


      return (
        matchesSearch &&
        matchesProvince &&
        matchesCity &&
        matchesCollegeType
      );

    });

  }


  // =========================
  // CLEAR FILTERS
  // =========================

  clearFilters(): void {

    this.searchTerm = '';

    this.selectedProvince = '';

    this.selectedCity = '';

    this.selectedCollegeType = '';

  }


  // =========================
  // ACTIVE FILTER CHECK
  // =========================

  get hasActiveFilters(): boolean {

    return !!(
      this.searchTerm ||
      this.selectedProvince ||
      this.selectedCity ||
      this.selectedCollegeType
    );

  }


  // =========================
  // PROVINCE CHANGE
  // =========================

  onProvinceChange(): void {

    // If a province is selected,
    // only show cities from that province.

    if (this.selectedProvince) {

      this.availableCities = [
        ...new Set(
          this.colleges
            .filter(
              college =>
                college.province === this.selectedProvince
            )
            .map(college => college.city)
            .filter(
              (city): city is string =>
                !!city
            )
        )
      ].sort();

    } else {

      // Show all cities again
      this.availableCities = [
        ...new Set(
          this.colleges
            .map(college => college.city)
            .filter(
              (city): city is string =>
                !!city
            )
        )
      ].sort();

    }


    // Reset city when province changes
    this.selectedCity = '';

  }

}