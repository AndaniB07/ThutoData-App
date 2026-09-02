import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Accessibility {

  private isSpeaking = false;

  constructor() {
    this.loadSettings();
  }

  // ================================
  // READ ALOUD
  // ================================

  readAloud(text: string): void {

    window.speechSynthesis.cancel();

    if (!text || text.trim().length === 0) {
      return;
    }

    const sections = text
      .split(/\n+/)
      .map(section => section.trim())
      .filter(section => section.length > 0);

    this.readSections(sections, 0);
  }

  private readSections(
    sections: string[],
    index: number
  ): void {

    if (index >= sections.length) {
      this.isSpeaking = false;
      return;
    }

    const speech = new SpeechSynthesisUtterance(
      sections[index]
    );

    speech.lang = 'en-ZA';
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;

    this.isSpeaking = true;

    speech.onend = () => {

      setTimeout(() => {
        this.readSections(sections, index + 1);
      }, 500);

    };

    speech.onerror = () => {
      this.isSpeaking = false;
    };

    window.speechSynthesis.speak(speech);
  }

  // ================================
  // STOP READING
  // ================================

  stopReading(): void {

    window.speechSynthesis.cancel();

    this.isSpeaking = false;
  }

  // ================================
  // TEXT SIZE
  // ================================

setTextSize(size: number): void {

  size = Math.max(80, Math.min(200, size));

  const app = document.querySelector('ion-app');

  if (app) {
    (app as HTMLElement).style.zoom = `${size}%`;
  }

  localStorage.setItem(
    'thutodata-text-size',
    size.toString()
  );
}

  getTextSize(): number {

  const savedSize =
    localStorage.getItem('thutodata-text-size');

  return savedSize
    ? Number(savedSize)
    : 100;
}


resetTextSize(): void {

  const app = document.querySelector('ion-app');

  if (app) {
    (app as HTMLElement).style.zoom = '100%';
  }

  localStorage.setItem(
    'thutodata-text-size',
    '100'
  );
}

  // ================================
  // LOAD SETTINGS
  // ================================

  private loadSettings(): void {

  const savedSize = this.getTextSize();

  setTimeout(() => {
    this.setTextSize(savedSize);
  }, 300);
}

  // ================================
  // CHECK READING STATUS
  // ================================

  getSpeakingStatus(): boolean {

    return this.isSpeaking;
  }

}

