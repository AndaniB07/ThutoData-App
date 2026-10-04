import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import { FooterComponent } from '../../components/footer/footer.component';
import { AccessibilityControlsComponent } from '../../components/accessibility-controls/accessibility-controls.component';

interface Subject {
  name: string;
  mark: number | null;
  aps: number | null;
  excluded?: boolean;
}

@Component({
  selector: 'app-aps-calculator',
  templateUrl: './aps-calculator.page.html',
  styleUrls: ['./aps-calculator.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FooterComponent,
    AccessibilityControlsComponent
  ]
})
export class ApsCalculatorPage {

  subjects: Subject[] = [
    {
      name: 'Home Language',
      mark: null,
      aps: null
    },
    {
      name: 'First Additional Language',
      mark: null,
      aps: null
    },
    {
      name: 'Mathematics / Mathematical Literacy',
      mark: null,
      aps: null
    },
    {
      name: 'Subject 4',
      mark: null,
      aps: null
    },
    {
      name: 'Subject 5',
      mark: null,
      aps: null
    },
    {
      name: 'Subject 6',
      mark: null,
      aps: null
    },
    {
      name: 'Life Orientation',
      mark: null,
      aps: null,
      excluded: true
    }
  ];

  totalAPS = 0;
  calculated = false;

  calculateAPS(): void {
    this.totalAPS = 0;

    this.subjects.forEach(subject => {

      if (subject.mark === null || subject.mark === undefined) {
        subject.aps = null;
        return;
      }

      subject.aps = this.convertMarkToAPS(subject.mark);

      // Life Orientation is not included in the APS total
      if (!subject.excluded) {
        this.totalAPS += subject.aps;
      }
    });

    this.calculated = true;
  }

  convertMarkToAPS(mark: number): number {

    if (mark >= 80) {
      return 7;
    }

    if (mark >= 70) {
      return 6;
    }

    if (mark >= 60) {
      return 5;
    }

    if (mark >= 50) {
      return 4;
    }

    if (mark >= 40) {
      return 3;
    }

    if (mark >= 30) {
      return 2;
    }

    return 1;
  }

  clearCalculator(): void {

    this.subjects.forEach(subject => {
      subject.mark = null;
      subject.aps = null;
    });

    this.totalAPS = 0;
    this.calculated = false;
  }

  getResultMessage(): string {

    if (this.totalAPS >= 35) {
      return 'Excellent APS! You may meet the requirements for many programmes.';
    }

    if (this.totalAPS >= 30) {
      return 'Good APS! You may meet the requirements for a range of programmes.';
    }

    if (this.totalAPS >= 25) {
      return 'Your APS may meet the requirements for some programmes.';
    }

    return 'Check individual programme requirements carefully, as some programmes may require a higher APS.';
  }
}