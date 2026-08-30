import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-universities',
  templateUrl: 'universities.page.html',
  styleUrls: ['universities.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, RouterLink]
})
export class UniversitiesPage {

  constructor() {}

}
