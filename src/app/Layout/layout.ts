import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
  standalone: true,
  imports: [RouterOutlet,RouterModule]
})
export class LayoutComponent {
  sidebarCollapsed = false;
  pageTitle = 'Dashboard';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        if (url.includes('home')) this.pageTitle = 'Home';
        else if (url.includes('member')) this.pageTitle = 'Members';
        else if (url.includes('coreteam')) this.pageTitle = 'Core-Team';
        else if (url.includes('specialthanks')) this.pageTitle = 'Special Thanks';
        else this.pageTitle = 'Dashboard';
      }
    });
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  logout() {
    // Clear auth token or session data
    localStorage.removeItem('token'); 
    // Redirect to login page
    this.router.navigate(['/']);
  }
}
