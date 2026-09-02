import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-bursary-details',
  templateUrl: './bursary-details.page.html',
  styleUrls: ['./bursary-details.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class BursaryDetailsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
