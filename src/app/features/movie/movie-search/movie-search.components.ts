import { Component, Input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'movie-search',
  templateUrl: './movie-search.component.html',
  imports: [FormsModule],
  standalone: true,
})
export class MovieSearchComponent {
  searchValue = model<string>('');

  search = output<string>();
}
