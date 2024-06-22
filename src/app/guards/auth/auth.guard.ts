import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private router: Router,
    private auth: AuthService,
  ) {}
  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const token = window.localStorage.getItem('token');
    console.log(token);
    if (token) {
      return true;
    } else {
      this.router.navigateByUrl('/login', { replaceUrl: true });
      return false;
    }
  }
}
