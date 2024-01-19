import { Component, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { navbarData } from './nav-data';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';


interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;
}


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms', 
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class SidebarComponent {
  // @Input() displaySidebar =false;
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  constructor(private router : Router, private sharedDataService : SharedDataService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  ngOnInit(): void {
      this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  viewDetails(link: any): void {
    // console.log(link);
    if(link === "logout"){
    this.sharedDataService.changeUserId(null);
  }
    // this.sharedDataService.changeUserId(null);
    // if(userId !== null && userId !== undefined && userId !== ""){
      // console.log("Hitting profile");
      this.router.navigate([link]);
    // } 
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }
}
