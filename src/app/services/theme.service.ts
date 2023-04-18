import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}

  checkTheme() {
    // at the start
    const prefersDarkTheme = window.matchMedia('prefers-color-scheme: dark');
    console.log(prefersDarkTheme.matches);
    this.toggleDarkTheme(prefersDarkTheme.matches);

    //at runtime
    prefersDarkTheme.addEventListener('change', (media) => {
      this.toggleDarkTheme(media.matches);
    });
  }

  toggleDarkTheme(enable: boolean) {
    document.body.classList.toggle('dark', enable);
  }
}
