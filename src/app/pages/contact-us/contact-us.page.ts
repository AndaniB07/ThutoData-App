import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular';

import { FooterComponent } from '../../components/footer/footer.component';
import { AccessibilityControlsComponent } from '../../components/accessibility-controls/accessibility-controls.component';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonContent,
    IonIcon,
    FooterComponent,
    AccessibilityControlsComponent
  ]
})
export class ContactUsPage {

}