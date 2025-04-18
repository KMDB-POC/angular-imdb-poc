import { HttpClient } from '@angular/common/http';
import {
  KeywordSearchResponse,
  MovieSearchResponse,
} from '@features/movie/movies.model';
import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  MoviesFilterOptions,
  MoviesKeywordOptions,
  MoviesSearchOptions,
} from '@features/movie/shared/movies-options.model';

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

  findKeyword(options: MoviesKeywordOptions) {
    return this.http
      .get<KeywordSearchResponse>(`/search/keyword`, {
        params: {
          ...options,
        },
      })
      .pipe(map((data) => data));
  }
}
