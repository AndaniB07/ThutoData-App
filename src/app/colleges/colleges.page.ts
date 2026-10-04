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
   COLLEGE INTERFACE
========================================================= */

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


/* =========================================================
   COMPONENT
========================================================= */

@Component({

  selector: 'app-colleges',

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

  templateUrl: './colleges.page.html',

  styleUrls: ['./colleges.page.scss']

})


export class CollegesPage implements OnInit {


  /* =========================================================
     API
  ========================================================= */

  private apiUrl =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/Universities';


  /* =========================================================
     SEARCH
  ========================================================= */

  searchTerm = '';


  /* =========================================================
     FILTERS
  ========================================================= */

  selectedProvince = '';

  selectedCity = '';

  selectedCollegeType = '';


  /* =========================================================
     COLLEGE DATA
  ========================================================= */

  colleges: College[] = [];


  /* =========================================================
     FILTER OPTIONS
  ========================================================= */

  availableProvinces: string[] = [];

  availableCities: string[] = [];

  availableCollegeTypes: string[] = [];


  /* =========================================================
     STATE
  ========================================================= */

  loading = true;

  errorMessage = '';


  /* =========================================================
     SAVED COLLEGES
  ========================================================= */

  savedCollegeIds = new Set<number>();

  savingCollegeId: number | null = null;


  /* =========================================================
     CONSTRUCTOR
  ========================================================= */

  constructor(

    private http: HttpClient,

    private cdr: ChangeDetectorRef,

    private auth: Auth,

    private savedService: SavedService

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
     PAGE LOAD
  ========================================================= */

  ngOnInit(): void {

    this.loadColleges();

    this.loadSavedColleges();

  }


  /* =========================================================
     LOAD COLLEGES
  ========================================================= */

  loadColleges(): void {

    this.loading = true;

    this.errorMessage = '';


    this.http
      .get<College[]>(this.apiUrl)
      .subscribe({

        next: (data) => {

          console.log(
            '========== COLLEGES API =========='
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
            'TOTAL RECORDS:',
            data?.length
          );


          /* -----------------------------------------
             ONLY KEEP COLLEGES
          ----------------------------------------- */

          this.colleges =
            (data || []).filter(

              institution =>
                institution.institutionType
                  ?.toLowerCase() === 'college'

            );


          console.log(
            'TOTAL COLLEGES:',
            this.colleges.length
          );


          /* -----------------------------------------
             BUILD FILTER OPTIONS
          ----------------------------------------- */

          this.buildFilterOptions();


          /* -----------------------------------------
             FINISHED LOADING
          ----------------------------------------- */

          this.loading = false;

          this.cdr.detectChanges();

        },


        error: (error) => {

          console.error(
            'College API error:',
            error
          );


          this.errorMessage =
            'Unable to load colleges. Please reload the page.';

          this.colleges = [];

          this.loading = false;

          this.cdr.detectChanges();

        }

      });

  }


  /* =========================================================
     LOAD SAVED COLLEGES
  ========================================================= */

  loadSavedColleges(): void {

    const user =
      this.auth.getUser();

    const token =
      this.auth.getToken();


    /* -----------------------------------------
       USER NOT LOGGED IN
    ----------------------------------------- */

    if (!user || !token) {

      this.savedCollegeIds.clear();

      this.cdr.detectChanges();

      return;

    }


    /* -----------------------------------------
       LOAD SAVED ITEMS
    ----------------------------------------- */

    this.savedService
      .getSavedUniversities()
      .subscribe({

        next: (data) => {

          this.savedCollegeIds.clear();


          if (!Array.isArray(data)) {

            this.cdr.detectChanges();

            return;

          }


          data.forEach((item: any) => {

            const collegeId =

              item?.universityID ??

              item?.UniversityID ??

              item?.university?.universityID ??

              item?.University?.universityID ??

              item?.University?.UniversityID;


            if (collegeId != null) {

              this.savedCollegeIds.add(
                Number(collegeId)
              );

            }

          });


          this.cdr.detectChanges();

        },


        error: (error) => {

          console.error(
            'ERROR LOADING SAVED COLLEGES:',
            error
          );

        }

      });

  }


  /* =========================================================
     CHECK IF COLLEGE IS SAVED
  ========================================================= */

  isCollegeSaved(
    collegeId: number
  ): boolean {

    return this.savedCollegeIds.has(
      Number(collegeId)
    );

  }


  /* =========================================================
     SAVE / REMOVE COLLEGE
  ========================================================= */

  toggleCollegeSave(
    collegeId: number
  ): void {

    const user =
      this.auth.getUser();

    const token =
      this.auth.getToken();


    /* -----------------------------------------
       USER NOT LOGGED IN
    ----------------------------------------- */

    if (!user || !token) {

      console.log(
        'User is not logged in.'
      );

      return;

    }


    /* -----------------------------------------
       PREVENT DOUBLE CLICK
    ----------------------------------------- */

    if (
      this.savingCollegeId !== null
    ) {

      return;

    }


    this.savingCollegeId =
      Number(collegeId);


    /* =====================================================
       REMOVE COLLEGE
    ===================================================== */

    if (
      this.isCollegeSaved(
        collegeId
      )
    ) {

      this.savedService
        .removeUniversity(
          collegeId
        )
        .subscribe({

          next: () => {

            this.savedCollegeIds.delete(
              Number(collegeId)
            );


            this.savingCollegeId = null;

            this.cdr.detectChanges();

          },


          error: (error) => {

            console.error(
              'ERROR REMOVING COLLEGE:',
              error
            );


            this.savingCollegeId = null;

            this.cdr.detectChanges();

          }

        });


      return;

    }


    /* =====================================================
       SAVE COLLEGE
    ===================================================== */

    this.savedService
      .saveUniversity(
        collegeId
      )
      .subscribe({

        next: () => {

          this.savedCollegeIds.add(
            Number(collegeId)
          );


          this.savingCollegeId = null;

          this.cdr.detectChanges();

        },


        error: (error) => {

          console.error(
            'ERROR SAVING COLLEGE:',
            error
          );


          this.savingCollegeId = null;

          this.cdr.detectChanges();

        }

      });

  }


  /* =========================================================
     BUILD FILTER OPTIONS
  ========================================================= */

  buildFilterOptions(): void {

    /* -----------------------------------------
       PROVINCES
    ----------------------------------------- */

    this.availableProvinces = [

      ...new Set(

        this.colleges

          .map(
            college =>
              college.province
          )

          .filter(
            (province): province is string =>
              !!province
          )

          .map(
            province =>
              province.trim()
          )

          .filter(
            province =>
              province.length > 0
          )

      )

    ].sort();


    /* -----------------------------------------
       CITIES
    ----------------------------------------- */

    this.availableCities = [

      ...new Set(

        this.colleges

          .map(
            college =>
              college.city
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


    /* -----------------------------------------
       COLLEGE TYPES
    ----------------------------------------- */

    this.availableCollegeTypes = [

      ...new Set(

        this.colleges

          .map(
            college =>
              college.universityType
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
     FILTERED COLLEGES
  ========================================================= */

  get filteredColleges(): College[] {

    const search =
      this.searchTerm
        .toLowerCase()
        .trim();


    return this.colleges.filter(
      college => {


        /* -----------------------------------------
           SEARCH
        ----------------------------------------- */

        const matchesSearch =

          !search ||

          college.universityName
            ?.toLowerCase()
            .includes(search) ||

          college.abbreviation
            ?.toLowerCase()
            .includes(search) ||

          college.city
            ?.toLowerCase()
            .includes(search) ||

          college.province
            ?.toLowerCase()
            .includes(search);


        /* -----------------------------------------
           PROVINCE
        ----------------------------------------- */

        const matchesProvince =

          !this.selectedProvince ||

          college.province
            ?.toLowerCase() ===
          this.selectedProvince
            .toLowerCase();


        /* -----------------------------------------
           CITY
        ----------------------------------------- */

        const matchesCity =

          !this.selectedCity ||

          college.city
            ?.toLowerCase() ===
          this.selectedCity
            .toLowerCase();


        /* -----------------------------------------
           COLLEGE TYPE
        ----------------------------------------- */

        const matchesCollegeType =

          !this.selectedCollegeType ||

          college.universityType
            ?.toLowerCase() ===
          this.selectedCollegeType
            .toLowerCase();


        /* -----------------------------------------
           ALL FILTERS
        ----------------------------------------- */

        return (

          matchesSearch &&

          matchesProvince &&

          matchesCity &&

          matchesCollegeType

        );

      }

    );

  }


  /* =========================================================
     PROVINCE CHANGE
  ========================================================= */

  onProvinceChange(): void {

    /*
     * When a province is selected,
     * only show cities belonging to
     * that province.
     */

    if (this.selectedProvince) {

      this.availableCities = [

        ...new Set(

          this.colleges

            .filter(
              college =>
                college.province
                  ?.toLowerCase() ===
                this.selectedProvince
                  .toLowerCase()
            )

            .map(
              college =>
                college.city
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

    } else {

      /*
       * No province selected:
       * show all cities.
       */

      this.availableCities = [

        ...new Set(

          this.colleges

            .map(
              college =>
                college.city
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

    }


    /*
     * Clear the selected city because
     * the province has changed.
     */

    this.selectedCity = '';

  }


  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  clearFilters(): void {

    this.searchTerm = '';

    this.selectedProvince = '';

    this.selectedCity = '';

    this.selectedCollegeType = '';


    /*
     * Restore all filter options.
     */

    this.buildFilterOptions();


    this.cdr.detectChanges();

  }


  /* =========================================================
     ACTIVE FILTER CHECK
  ========================================================= */

  get hasActiveFilters(): boolean {

    return !!(

      this.searchTerm ||

      this.selectedProvince ||

      this.selectedCity ||

      this.selectedCollegeType

    );

  }


  /* =========================================================
     RETRY
  ========================================================= */

  retry(): void {

    this.loadColleges();

  }

}