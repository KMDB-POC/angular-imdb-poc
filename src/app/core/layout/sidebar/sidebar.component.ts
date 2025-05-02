import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor() {}
}
