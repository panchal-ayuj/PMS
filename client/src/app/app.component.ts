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
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.hideBar();
    
  }
  // displaySidebar = false;

  hideBar(): boolean {
    console.log(localStorage.getItem("token"))
    return localStorage.getItem("token") !== null;
  }
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