import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  private isSidebarOpenSubject = new BehaviorSubject<boolean>(true);
  private isMobileSubject = new BehaviorSubject<boolean>(false);

  isSidebarOpen$ = this.isSidebarOpenSubject.asObservable();
  isMobile$ = this.isMobileSubject.asObservable();

  ngOnInit(): void {
    this.checkScreenSize();
    this.isSidebarOpenSubject.next(!this.isMobileView());
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
    if (!this.isMobileView()) {
      this.isSidebarOpenSubject.next(true);
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpenSubject.next(!this.isSidebarOpenSubject.value);
  }

  openSidebar(): void {
    this.isSidebarOpenSubject.next(true);
  }

  closeSidebar(): void {
    if (this.isMobileView()) {
      this.isSidebarOpenSubject.next(false);
    }
  }

  get isSidebarOpen(): boolean {
    return this.isSidebarOpenSubject.value;
  }

  get isMobile(): boolean {
    return this.isMobileSubject.value;
  }

  private checkScreenSize(): void {
    this.isMobileSubject.next(this.isMobileView());
  }

  private isMobileView(): boolean {
    return window.innerWidth < 768;
  }
}
