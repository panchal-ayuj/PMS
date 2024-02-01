import { Token } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  shouldDisplayBars: boolean = true; // Default to true for non-login pages

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.shouldDisplayBars =
          event.url.includes('/logout') ||
          event.url.includes('/hierarchy') ||
          event.url.includes('/navbar') ||
          event.url.includes('/keyresult') ||
          event.url.includes('/profile') ||
          event.url.includes('/admin') ||
          event.url.includes('/admin/user') ||
          event.url.includes('/admin/keyresult') ||
          event.url.includes('/admin/reviewcycle') ||
          event.url.includes('/admin/feedback') ||
          event.url.includes('/admin/task') ||
          event.url.includes('/team') ||
          event.url.includes('/feedback');
      }
    });
    // this.hideBar();
  }
  // displaySidebar = false;

  constructor(private router: Router) {}

  // hideBar(): boolean {
  //   // console.log(localStorage.getItem("token"))
  //   return localStorage.getItem('token') !== null;
  // }
  // constructor(private router: Router) {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       // Check if the current route allows displaying the sidebar
  //       this.displaySidebar = !event.url.includes('login');
  //     }
  //   });
  // }
  title = 'sidenav';

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
