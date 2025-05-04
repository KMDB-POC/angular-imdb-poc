import { Injectable } from '@angular/core';
import {
  KeywordSearchResponse,
  MovieSearchResponse,
  MovieVideoResponse,
} from '@features/movie/movies.model';
import { map } from 'rxjs';
import {
  MoviesFilterOptions,
  MoviesKeywordOptions,
  MoviesSearchOptions,
} from '@features/movie/shared/movies-options.model';
import { ApiResponse } from '@core/models/api-response.model';
import { BackendApiService } from '@core/services/backend-api.service';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  constructor(private backendApi: BackendApiService) {}

  get(options?: MoviesFilterOptions) {
    return this.backendApi
      .get<ApiResponse<MovieSearchResponse>>('/movie', options)
      .pipe(map((data) => data));
  }

  search(options: MoviesSearchOptions) {
    return this.backendApi
      .get<ApiResponse<MovieSearchResponse>>('/movie/search', options)
      .pipe(map((data) => data));
  }

  findKeyword(options: MoviesKeywordOptions) {
    return this.backendApi
      .get<ApiResponse<KeywordSearchResponse>>('/movie/keyword', options)
      .pipe(map((data) => data));
  }

  getVideos(movieId: number) {
    return this.backendApi
      .get<ApiResponse<MovieVideoResponse>>(`/movie/${movieId}/videos`)
      .pipe(map((data) => data));
  }
}
