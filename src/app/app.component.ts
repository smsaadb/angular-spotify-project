import { AuthService } from './auth.service';
import { OnInit } from '@angular/core';

import { Component } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  searchString: string;
  title = 'Music';
  token: any;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    /**
     * Below, we are subscribing to router events. However, we are only interested
     * in the first event because we want to read the token once.
     */
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.token = this.auth.readToken();
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  handleSearch(): void {
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchString },
    });
    this.searchString = '';
  }
}
