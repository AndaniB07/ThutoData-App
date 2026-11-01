
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  IonContent,
  IonIcon
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  bookOutline,
  informationCircleOutline,
  logInOutline,
  personAddOutline,
  chevronForwardOutline,
  personCircleOutline,
  documentTextOutline
} from 'ionicons/icons';

import { AccessibilityControlsComponent } from '../components/accessibility-controls/accessibility-controls.component';
import { FooterComponent } from '../components/footer/footer.component';
import { Auth, User } from '../services/auth';

addIcons({
  'book-outline': bookOutline,
  'information-circle-outline': informationCircleOutline,
  'log-in-outline': logInOutline,
  'person-add-outline': personAddOutline,
  'chevron-forward-outline': chevronForwardOutline,
  'person-circle-outline': personCircleOutline,
  'document-text-outline': documentTextOutline
});

@Component({
  selector: 'app-more',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonIcon,
    AccessibilityControlsComponent,
    FooterComponent
  ],
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss']
})
export class MorePage implements OnInit, OnDestroy {

  currentUser: User | null = null;

  private userSubscription?: Subscription;

  constructor(
    private auth: Auth
  ) {}

  ngOnInit(): void {

    this.userSubscription = this.auth.user$.subscribe(user => {
      this.currentUser = user;
    });

  }

  ngOnDestroy(): void {

    this.userSubscription?.unsubscribe();

  }

}
