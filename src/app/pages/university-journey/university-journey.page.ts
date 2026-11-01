
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
  IonCheckbox,
  IonProgressBar,
  IonCard,
  IonCardContent
} from '@ionic/angular';
import { Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { AccessibilityControlsComponent } from '../../components/accessibility-controls/accessibility-controls.component';

interface JourneyStep {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  route: string;
  completed: boolean;
}

@Component({
  selector: 'app-university-journey',
  templateUrl: './university-journey.page.html',
  styleUrls: ['./university-journey.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonButton,
    IonCheckbox,
    IonProgressBar,
    IonCard,
    IonCardContent,
    FooterComponent,
    AccessibilityControlsComponent
  ]
})
export class UniversityJourneyPage implements OnInit {

  private readonly storageKey = 'thutodata-university-journey';

  journeySteps: JourneyStep[] = [
    {
  id: 1,
  title: 'Explore Institutions',
  description: 'Explore universities and colleges to discover institutions that offer opportunities aligned with your interests.',
  buttonText: 'Explore Institutions',
  route: '/tabs/universities',
  completed: false
},
    {
      id: 2,
      title: 'Find Courses',
      description: 'Explore available courses and qualifications to find a study programme that matches your interests.',
      buttonText: 'Explore Courses',
      route: '/tabs/courses',
      completed: false
    },
    {
      id: 3,
      title: 'Check Admission Requirements',
      description: 'Understand the APS scores and subject requirements you may need to qualify for your chosen course.',
      buttonText: 'Calculate My APS',
      route: '/tabs/aps-calculator',
      completed: false
    },
    {
      id: 4,
      title: 'Find Funding Opportunities',
      description: 'Explore bursaries and funding opportunities that could help you pay for your studies.',
      buttonText: 'Explore Bursaries',
      route: '/tabs/bursaries',
      completed: false
    },
    {
      id: 5,
      title: 'Check Important Dates',
      description: 'Keep track of application opening dates, closing dates and other important deadlines.',
      buttonText: 'View Important Dates',
      route: '/tabs/application-process',
      completed: false
    },
    {
      id: 6,
      title: 'Save Your Study Options',
      description: 'Save universities and courses that interest you so you can easily revisit your options.',
      buttonText: 'View Saved Universities',
      route: '/tabs/saved-universities',
      completed: false
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadProgress();
  }

  get completedSteps(): number {
    return this.journeySteps.filter(step => step.completed).length;
  }

  get totalSteps(): number {
    return this.journeySteps.length;
  }

  get progressPercentage(): number {
    return this.totalSteps === 0
      ? 0
      : this.completedSteps / this.totalSteps;
  }

  toggleStep(step: JourneyStep) {
    step.completed = !step.completed;
    this.saveProgress();
  }

  openStep(step: JourneyStep) {
    this.router.navigateByUrl(step.route);
  }

  openUniversities(): void {
  this.router.navigate(['/tabs/universities']);
}

openColleges(): void {
  this.router.navigate(['/tabs/colleges']);
}

  saveProgress() {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.journeySteps.map(step => ({
        id: step.id,
        completed: step.completed
      })))
    );
  }

  loadProgress() {
    const savedProgress = localStorage.getItem(this.storageKey);

    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);

        this.journeySteps.forEach(step => {
          const savedStep = progress.find(
            (item: { id: number; completed: boolean }) =>
              item.id === step.id
          );

          if (savedStep) {
            step.completed = savedStep.completed;
          }
        });
      } catch (error) {
        console.error('Could not load journey progress:', error);
      }
    }
  }

  resetProgress() {
    this.journeySteps.forEach(step => {
      step.completed = false;
    });

    localStorage.removeItem(this.storageKey);
  }
}
