import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bursaries',
  templateUrl: 'bursaries.page.html',
  styleUrls: ['bursaries.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, RouterLink],
})
export class BursariesPage {
  constructor() {}
}
