import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer.component';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular';

import { AccessibilityControlsComponent } from '../../components/accessibility-controls/accessibility-controls.component';

@Component({
  selector: 'app-application-process',
  templateUrl: './application-process.page.html',
  styleUrls: ['./application-process.page.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    CommonModule,
    FormsModule,
    FooterComponent,
    AccessibilityControlsComponent
  ]
})
export class ApplicationProcessPage implements OnInit {

  constructor() {}

  ngOnInit() {}

}