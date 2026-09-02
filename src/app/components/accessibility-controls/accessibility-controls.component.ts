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
    this.textSize = this.accessibility.getTextSize();
  }

  readPage(): void {

    const content = document.querySelector('ion-content');

    if (!content) {
      return;
    }

    const elements = content.querySelectorAll(
      'h1, h2, h3, h4, p, li, button, label, span, a'
    );

    const sections: string[] = [];

    elements.forEach(element => {

      if (element.closest('app-accessibility-controls')) {
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

}