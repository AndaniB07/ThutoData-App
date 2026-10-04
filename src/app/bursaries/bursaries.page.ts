import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { IonContent, IonIcon } from '@ionic/angular';

import { addIcons } from 'ionicons';
import {
  searchOutline,
  filterOutline,
  calendarOutline,
  businessOutline,
  schoolOutline,
  chevronForwardOutline,
  closeOutline,
  openOutline,
  refreshOutline
} from 'ionicons/icons';

import { FooterComponent } from '../components/footer/footer.component';
import { AccessibilityControlsComponent } from '../components/accessibility-controls/accessibility-controls.component';

interface Funding {
  fundingID: number;
  fundingName: string;
  provider: string;
  fundingType: string;
  description: string;
  eligibility: string;
  deadline: string | null;
  applicationURL: string | null;
  universityFundings?: any[];
}

@Component({
  selector: 'app-bursaries',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonContent,
    IonIcon,
    FooterComponent,
    AccessibilityControlsComponent
  ],

  templateUrl: './bursaries.page.html',
  styleUrls: ['./bursaries.page.scss']
})
export class BursariesPage implements OnInit {

  private apiUrl = 'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/Funding';

  searchTerm = '';

  selectedFundingType = '';

  selectedDeadline = '';

  funding: Funding[] = [];

  isLoading = false;

  hasError = false;


  constructor(private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {

    addIcons({
      searchOutline,
      filterOutline,
      calendarOutline,
      businessOutline,
      schoolOutline,
      chevronForwardOutline,
      closeOutline,
      openOutline,
      refreshOutline
    });

  }


  ngOnInit(): void {

    this.loadFunding();

  }


  loadFunding(): void {

    this.isLoading = true;

    this.hasError = false;

    this.http.get<Funding[]>(this.apiUrl).subscribe({

      next: (data) => {

        this.funding = data || [];

        this.isLoading = false;

        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error('Funding API error:', error);

        this.hasError = true;

        this.isLoading = false;

      }

    });

  }


  get filteredFunding(): Funding[] {

    const search = this.searchTerm
      .toLowerCase()
      .trim();


    return this.funding.filter(item => {

      const matchesSearch =
        !search ||

        item.fundingName
          ?.toLowerCase()
          .includes(search) ||

        item.provider
          ?.toLowerCase()
          .includes(search) ||

        item.description
          ?.toLowerCase()
          .includes(search);


      const matchesType =
        !this.selectedFundingType ||

        item.fundingType === this.selectedFundingType;


      const matchesDeadline =
        this.matchesDeadline(item);


      return (
        matchesSearch &&
        matchesType &&
        matchesDeadline
      );

    });

  }


  matchesDeadline(item: Funding): boolean {

    if (!this.selectedDeadline) {
      return true;
    }


    if (!item.deadline) {
      return this.selectedDeadline === 'no-deadline';
    }


    const deadline = new Date(item.deadline);

    const today = new Date();


    if (this.selectedDeadline === 'open') {

      return deadline >= today;

    }


    if (this.selectedDeadline === 'expired') {

      return deadline < today;

    }


    if (this.selectedDeadline === '30-days') {

      const thirtyDays = new Date();

      thirtyDays.setDate(
        today.getDate() + 30
      );

      return (
        deadline >= today &&
        deadline <= thirtyDays
      );

    }


    return true;

  }


  clearFilters(): void {

    this.searchTerm = '';

    this.selectedFundingType = '';

    this.selectedDeadline = '';

  }


  get hasActiveFilters(): boolean {

    return !!(
      this.searchTerm ||
      this.selectedFundingType ||
      this.selectedDeadline
    );

  }


  isExpired(deadline: string | null): boolean {

    if (!deadline) {
      return false;
    }

    return new Date(deadline) < new Date();

  }


  formatDeadline(deadline: string | null): string {

    if (!deadline) {
      return 'No deadline provided';
    }


    const date = new Date(deadline);


    return date.toLocaleDateString(
      'en-ZA',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }
    );

  }


  getDeadlineStatus(deadline: string | null): string {

    if (!deadline) {
      return 'No deadline';
    }


    if (this.isExpired(deadline)) {
      return 'Closed';
    }


    const today = new Date();

    const deadlineDate = new Date(deadline);

    const difference =
      deadlineDate.getTime() -
      today.getTime();


    const days = Math.ceil(
      difference /
      (1000 * 60 * 60 * 24)
    );


    if (days <= 30) {
      return 'Closing soon';
    }


    return 'Open';

  }


  openApplication(url: string | null): void {

    if (!url) {
      return;
    }


    window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    );

  }

}