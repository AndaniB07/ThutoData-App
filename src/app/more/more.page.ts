import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  IonContent,
  IonIcon
} from '@ionic/angular';

import {
  addIcons
} from 'ionicons';

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

addIcons({
  'book-outline': bookOutline,
  'information-circle-outline': informationCircleOutline,
  'log-in-outline': logInOutline,
  'person-add-outline': personAddOutline,
  'chevron-forward-outline': chevronForwardOutline,
  'person-circle-outline': personCircleOutline,
  'document-text-outline' : documentTextOutline
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
export class MorePage {}
