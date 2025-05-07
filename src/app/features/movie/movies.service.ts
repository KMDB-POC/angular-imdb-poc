import { inject, Injectable } from '@angular/core';
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
  private backendApi = inject(BackendApiService);

  get(options?: MoviesFilterOptions) {
    return this.backendApi
      .get<ApiResponse<MovieSearchResponse>>(
        '/movie',
        options,
        this.backendApi.createSkipErrorHandlerHeaders()
      )
      .pipe(map((data) => data));
  }

  search(options: MoviesSearchOptions) {
    return this.backendApi
      .get<ApiResponse<MovieSearchResponse>>(
        '/movie/search',
        options,
        this.backendApi.createSkipErrorHandlerHeaders()
      )
      .pipe(map((data) => data));
  }

  findKeyword(options: MoviesKeywordOptions) {
    return this.backendApi
      .get<ApiResponse<KeywordSearchResponse>>(
        '/movie/keyword',
        options,
        this.backendApi.createSkipErrorHandlerHeaders()
      )
      .pipe(map((data) => data));
  }

  getVideos(movieId: number) {
    return this.backendApi
      .get<ApiResponse<MovieVideoResponse>>(
        `/movie/${movieId}/videos`,
        null,
        this.backendApi.createSkipErrorHandlerHeaders()
      )
      .pipe(map((data) => data));
  }
}
