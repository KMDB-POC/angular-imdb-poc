import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatIconModule],
})
export class HeaderComponent {
  currentUserName: string | null = null;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {
    this.authService.isAuthenticated().subscribe((auth) => {
      this.isAuthenticated = auth;
    });
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUserName = user?.name || null;
    });
  }
}
