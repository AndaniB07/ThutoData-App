import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonIcon
} from '@ionic/angular';
import { FooterComponent } from '../components/footer/footer.component';
import { AccessibilityControlsComponent } from '../components/accessibility-controls/accessibility-controls.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonIcon,
    FooterComponent,
    AccessibilityControlsComponent
  ],
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss']
})
export class AboutUsPage {}