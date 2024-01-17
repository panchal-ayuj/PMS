import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router: Router) {}

  search() {
    // Get the search query from the input field (you may use ngModel or form control)
    const searchQuery = 'your-search-query'; // Replace with your actual search query

    // Navigate to the search route, assuming you have a route for searching
    this.router.navigate(['/search'], { queryParams: { q: searchQuery } });
  }

}
