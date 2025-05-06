import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink, MatIconModule],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() sidebar!: SidebarComponent;

  currentRoute: string = '';
  currentUserName: string | null = null;
  isAuthenticated: boolean = false;
  isScrolled: boolean = false;
  isProfileMenuOpen: boolean = false;

  private authSubscription: Subscription | undefined;
  private userSubscription: Subscription | undefined;
  private routerSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {
    this.currentRoute = window.location.href;
  }

  ngOnInit(): void {
    this.authSubscription = this.authService
      .isAuthenticated()
      .subscribe((auth) => {
        this.isAuthenticated = auth;
      });

    this.userSubscription = this.authService
      .getCurrentUser()
      .subscribe((user) => {
        this.currentUserName = user?.name || null;
      });

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentRoute = window.location.href;
      });

    this.authService.checkAuthStatus().subscribe();

    this.checkScroll();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
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
