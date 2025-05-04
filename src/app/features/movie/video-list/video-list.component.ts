import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VideoList } from './video-list.model';
import { CommonModule } from '@angular/common';
import { VideoCardComponent } from '../video-card/video-card.component';

@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  standalone: true,
  imports: [CommonModule, VideoCardComponent],
})
export class VideoListComponent {
  @Input() list?: VideoList;
}
