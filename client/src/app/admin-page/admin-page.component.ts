import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent {
  adminData = [
    {
        routeLink: '/admin/user',
        label: 'User Registration'
    },
    {
        routeLink: '/admin/goalplan',
        label: 'Goal Plan Management'
    },
    {
        routeLink: '/admin/keyresult',
        label: 'Key Result Management'
    },
    {
        routeLink: '/admin/task',
        label: 'Task Management'
    },
    {
      routeLink: '/admin/reviewcycle',
      label: 'Review Cycle Management'
  }
];

}
