import { Component, Input } from '@angular/core';
import { VideoCard } from './video-card.model';
import { CommonModule } from '@angular/common';
import { formatDistanceToNow, parseISO } from 'date-fns';

@Component({
  selector: 'video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class VideoCardComponent {
  @Input() card!: VideoCard;
  @Input() label?: string;

  openVideo(): void {
    if (this.card.youtubeUrl) {
      window.open(this.card.youtubeUrl, '_blank');
    }
  }

  formatPublishDate(publishedAt: string): string {
    try {
      const date =
        typeof publishedAt === 'string' && publishedAt.includes('-')
          ? parseISO(publishedAt)
          : new Date(parseInt(publishedAt));

      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error('Error formatting date:', error);
      return publishedAt;
    }
  }
}
