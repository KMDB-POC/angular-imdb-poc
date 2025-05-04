import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
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

  currentUserName: string | null = null;
  isAuthenticated: boolean = false;
  isScrolled: boolean = false;

  constructor(private authService: AuthService) {
    this.authService.isAuthenticated().subscribe((auth) => {
      this.isAuthenticated = auth;
    });
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUserName = user?.name || null;
    });
  }

  ngOnInit(): void {
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  checkScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  toggleSidebar(): void {
    this.sidebar.toggleSidebar();
  }
}
