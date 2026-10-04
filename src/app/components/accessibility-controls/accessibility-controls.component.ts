import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Accessibility } from '../../services/accessibility';

@Component({
  selector: 'app-accessibility-controls',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './accessibility-controls.component.html',
  styleUrl: './accessibility-controls.component.scss'
})
export class AccessibilityControlsComponent {

  textSize = 100;
  highContrast = false;

  constructor(private accessibility: Accessibility) {
    this.syncSettings();
  }

  private syncSettings(): void {
    this.textSize = this.accessibility.getTextSize();
    this.highContrast = this.accessibility.getHighContrast();
  }

  readPage(): void {

    const elements = document.querySelectorAll(
      'h1, h2, h3, h4, h5, h6, p, li, button, label, a, ion-label, ion-button'
    );

    const sections: string[] = [];

    elements.forEach(element => {

      // Don't read the accessibility controls themselves
      if (element.closest('app-accessibility-controls')) {
        return;
      }

      // Don't read hidden Ionic pages
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

  stopReading(): void {
    this.accessibility.stopReading();
  }

  changeTextSize(): void {
    this.accessibility.setTextSize(this.textSize);
  }

  resetTextSize(): void {
    this.textSize = 100;
    this.accessibility.resetTextSize();
  }

  toggleHighContrast(): void {
    this.highContrast = !this.highContrast;

    this.accessibility.setHighContrast(
      this.highContrast
    );
  }

}