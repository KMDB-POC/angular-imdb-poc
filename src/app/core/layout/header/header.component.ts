import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink, MatIconModule],
})
export class HeaderComponent implements OnInit {
  @Input() sidebar!: SidebarComponent;

  currentRoute: string = '';
  currentUserName: string | null = null;
  isAuthenticated: boolean = false;
  isScrolled: boolean = false;
  isProfileMenuOpen: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.authService
      .isAuthenticated()
      .pipe(takeUntilDestroyed())
      .subscribe((auth) => {
        this.isAuthenticated = auth;
      });

    this.authService
      .getCurrentUser()
      .pipe(takeUntilDestroyed())
      .subscribe((user) => {
        this.currentUserName = user?.name || null;
      });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.currentRoute = window.location.href;
      });

    this.authService.checkAuthStatus(true).subscribe();
  }

  ngOnInit(): void {
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  checkScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent): void {
    // Close profile menu when clicking outside
    const profileMenuElement = document.querySelector('.relative');
    if (
      profileMenuElement &&
      !profileMenuElement.contains(event.target as Node) &&
      this.isProfileMenuOpen
    ) {
      this.isProfileMenuOpen = false;
    }
  }

  toggleSidebar(): void {
    this.sidebar.toggleSidebar();
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout(): void {
    this.isProfileMenuOpen = false;
    this.authService.logout();
  }
}
