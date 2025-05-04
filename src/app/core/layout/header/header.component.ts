import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

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

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isAuthenticated().subscribe((auth) => {
      this.isAuthenticated = auth;
    });
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUserName = user?.name || null;
    });
    this.currentRoute = window.location.href;
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
