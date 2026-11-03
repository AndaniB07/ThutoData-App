
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Accessibility } from '../../services/accessibility';
import { IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';

import {
  volumeHighOutline,
  stopCircleOutline,
  textOutline,
  refreshOutline,
  contrastOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-accessibility-controls',
  standalone: true,
  imports: [FormsModule, IonIcon],
  templateUrl: './accessibility-controls.component.html',
  styleUrl: './accessibility-controls.component.scss'
})
export class AccessibilityControlsComponent {

  textSize = 100;

  // Read the shared Signal from the Accessibility service
  highContrast = this.accessibility.highContrast;

  constructor(private accessibility: Accessibility) {

    // Register accessibility icons
    addIcons({
      'volume-high-outline': volumeHighOutline,
      'stop-circle-outline': stopCircleOutline,
      'text-outline': textOutline,
      'refresh-outline': refreshOutline,
      'contrast-outline': contrastOutline
    });

    this.textSize = this.accessibility.getTextSize();
  }

  // ================================
  // READ ALOUD
  // ================================

  readPage(): void {

    const elements = document.querySelectorAll(
      'h1, h2, h3, h4, h5, h6, p, li, button, label, a, ion-label, ion-button'
    );

    const sections: string[] = [];

    elements.forEach(element => {

      if (element.closest('app-accessibility-controls')) {
        return;
      }

      const page = element.closest('.ion-page');

      if (
        page &&
        page.classList.contains('ion-page-hidden')
      ) {
        return;
      }

      const text = element.textContent?.trim();

      if (text) {
        sections.push(text);
      }

    });

    this.accessibility.readAloud(
      sections.join('\n')
    );
  }

  // ================================
  // STOP READING
  // ================================

  stopReading(): void {
    this.accessibility.stopReading();
  }

  // ================================
  // TEXT SIZE
  // ================================

  changeTextSize(): void {
    this.accessibility.setTextSize(this.textSize);
  }

  // ================================
  // RESET ALL
  // ================================

  resetAccessibility(): void {

    this.accessibility.stopReading();

    this.textSize = 100;
    this.accessibility.resetTextSize();

    this.accessibility.setHighContrast(false);
  }

  // ================================
  // HIGH CONTRAST
  // ================================

  toggleHighContrast(): void {

    this.accessibility.setHighContrast(
      !this.highContrast()
    );

  }

}
