import { HttpClient } from '@angular/common/http';
import { MovieSearchResponse } from '@features/movie/models/api/movies.model';
import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  MoviesFilterOptions,
  MoviesSearchOptions,
} from '../models/api/movies-options.model';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  constructor(private http: HttpClient) {}

  get(options?: MoviesFilterOptions) {
    return this.http
      .get<MovieSearchResponse>(`/discover/movie`, {
        params: {
          ...options,
        },
      })
      .pipe(map((data) => data));
  }

  search(options: MoviesSearchOptions) {
    return this.http
      .get<MovieSearchResponse>(`/search/movie`, {
        params: {
          ...options,
        },
      })
      .pipe(map((data) => data));
  }
}
