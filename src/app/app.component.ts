import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ThemeService } from './services/theme.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule],
})
export class AppComponent {
  public appPages = [
    { title: 'All Tasks', url: 'tasks', icon: 'reader' },
    { title: 'New Task', url: 'add-task', icon: 'create' },
  ];

  constructor(private themeService: ThemeService) {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.themeService.checkTheme();
  }

  toggleTheme(event: any) {
    console.log(event.detail.checked);
    if (event.detail.checked) {
      return this.themeService.toggleDarkTheme(true);
    }
    return this.themeService.toggleDarkTheme(false);
  }
}
