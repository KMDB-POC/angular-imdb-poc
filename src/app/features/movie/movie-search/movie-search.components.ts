import { Component, Input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MoviesService } from '../movies.service';
import { KeywordSearch } from '../movies.model';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'movie-search',
  templateUrl: './movie-search.component.html',
  imports: [FormsModule],
  standalone: true,
  styleUrls: ['./movie-search.component.css'],
})
export class MovieSearchComponent {
  constructor(private movieService: MoviesService) {}

  searchValue = model<string>('');

  search = output<string>();

  suggestedItems = model<KeywordSearch[]>([]);

  inputChange(event: string) {
    debounceTime(500);
    this.searchValue.set(event);
    this.movieService.findKeyword({ Query: event }).subscribe((data) => {
      this.suggestedItems.set(data.result.results);
    });
  }
}
