import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular';
import { FooterComponent } from '../components/footer/footer.component';
import { AccessibilityControlsComponent } from '../components/accessibility-controls/accessibility-controls.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonIcon,
    IonContent,
    FooterComponent,
    AccessibilityControlsComponent
  ]
})
export class HomePage {

}