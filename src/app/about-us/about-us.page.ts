import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonIcon
} from '@ionic/angular';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonIcon,
    FooterComponent
  ],
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss']
})
export class AboutUsPage {}