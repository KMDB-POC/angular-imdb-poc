import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkAuthStatus();

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkAuthStatus();
      });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private checkAuthStatus() {
    this.authService.checkAuthStatus(true).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/']);
      }
    });
  }
}
