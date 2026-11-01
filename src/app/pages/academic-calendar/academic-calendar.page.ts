
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer.component';
import { ImportantDatesService, ImportantDate } from '../../services/important-dates';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  chevronBackOutline,
  chevronForwardOutline,
  calendarOutline,
  refreshOutline,
  timeOutline
} from 'ionicons/icons';
import { AccessibilityControlsComponent } from '../../components/accessibility-controls/accessibility-controls.component';

@Component({
  selector: 'app-academic-calendar',
  standalone: true,
  templateUrl: './academic-calendar.page.html',
  styleUrls: ['./academic-calendar.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonButton,
    IonIcon,
    FooterComponent,
    AccessibilityControlsComponent
  ]
})
export class AcademicCalendarPage implements OnInit {

  // Current date
  today = new Date();

  // Month currently displayed
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();

  // Selected calendar date
  selectedDate = new Date();

  // Weekday headings
  weekDays = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ];

  // Calendar days
  calendarDays: (Date | null)[] = [];

  // Important dates retrieved from the database
importantDates: ImportantDate[] = [];

isLoading = false;
errorMessage = '';

  constructor( private importantDatesService: ImportantDatesService) {

    addIcons({
      'chevron-back-outline': chevronBackOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'calendar-outline': calendarOutline,
      'refresh-outline': refreshOutline,
      'time-outline': timeOutline
    });

  }

  ngOnInit(): void {

    this.generateCalendar();
    this.loadImportantDates();

  }


  // Load important dates from the API
loadImportantDates(): void {

  this.isLoading = true;
  this.errorMessage = '';

  this.importantDatesService.getImportantDates().subscribe({

    next: (dates) => {

      this.importantDates = dates;
      this.isLoading = false;

    },

    error: (error) => {

      console.error('Error loading important dates:', error);

      this.errorMessage = 'Unable to load important dates. Please try again later.';
      this.isLoading = false;

    }

  });

}

// Get events for the selected date
getSelectedDateEvents(): ImportantDate[] {

  return this.importantDates.filter((event) => {

    const eventDate = new Date(event.date);

    return (
      eventDate.getDate() === this.selectedDate.getDate() &&
      eventDate.getMonth() === this.selectedDate.getMonth() &&
      eventDate.getFullYear() === this.selectedDate.getFullYear()
    );

  });

}


// Get upcoming important dates
getUpcomingDates(): ImportantDate[] {

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return this.importantDates
    .filter((event) => {

      const eventDate = new Date(event.date);

      eventDate.setHours(0, 0, 0, 0);

      return eventDate >= today;

    })
    .sort((a, b) => {

      return new Date(a.date).getTime() - new Date(b.date).getTime();

    })
    .slice(0, 10);

}


// Check whether a calendar day has an event
hasEvents(date: Date): boolean {

  return this.importantDates.some((event) => {

    const eventDate = new Date(event.date);

    return (
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear()
    );

  });

}

  // Displayed month and year
  get monthYear(): string {

    return new Date(
      this.currentYear,
      this.currentMonth
    ).toLocaleDateString('en-ZA', {
      month: 'long',
      year: 'numeric'
    });

  }

  // Generate calendar days
  generateCalendar(): void {

    this.calendarDays = [];

    const firstDay = new Date(
      this.currentYear,
      this.currentMonth,
      1
    ).getDay();

    const daysInMonth = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();

    // Empty spaces before the first day
    for (let i = 0; i < firstDay; i++) {

      this.calendarDays.push(null);

    }

    // Actual days in the month
    for (let day = 1; day <= daysInMonth; day++) {

      this.calendarDays.push(
        new Date(
          this.currentYear,
          this.currentMonth,
          day
        )
      );

    }

  }

  // Previous month
  previousMonth(): void {

    this.currentMonth--;

    if (this.currentMonth < 0) {

      this.currentMonth = 11;
      this.currentYear--;

    }

    this.generateCalendar();

  }

  // Next month
  nextMonth(): void {

    this.currentMonth++;

    if (this.currentMonth > 11) {

      this.currentMonth = 0;
      this.currentYear++;

    }

    this.generateCalendar();

  }

  // Select a calendar day
  selectDate(date: Date): void {

    this.selectedDate = date;

  }

  // Check whether a day is selected
  isSelected(date: Date): boolean {

    return (
      date.getDate() === this.selectedDate.getDate() &&
      date.getMonth() === this.selectedDate.getMonth() &&
      date.getFullYear() === this.selectedDate.getFullYear()
    );

  }

  // Check whether a day is today
  isToday(date: Date): boolean {

    return (
      date.getDate() === this.today.getDate() &&
      date.getMonth() === this.today.getMonth() &&
      date.getFullYear() === this.today.getFullYear()
    );

  }

  // Return to current month
  goToToday(): void {

    this.today = new Date();

    this.currentMonth = this.today.getMonth();
    this.currentYear = this.today.getFullYear();

    this.selectedDate = new Date(this.today);

    this.generateCalendar();

  }

}
