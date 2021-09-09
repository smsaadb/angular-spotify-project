import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GuardAuthService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  /**
   * Makes sure that an anonymous user doesn't visit sites he's not supposed
   * to by redirecting him to 'login'.
   */

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
