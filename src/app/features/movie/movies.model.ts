import { PaginatedResponse } from '@core/models/paginated-response.model';

export interface MovieResponse {
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  originalLanguage: string;
  releaseDate: string; //ex: 2025-04-15
  backdropPath: string;
  posterPath: string;
  genreIds: number[];
  popularity: number;
  voteAverage: 0;
  voteCount: 0;
  video: boolean;
  adult: boolean;
}

export interface MovieSearchResponse extends PaginatedResponse<MovieResponse> {}

export interface KeywordSearch {
  id: number;
  name: string;
}

export interface KeywordSearchResponse
  extends PaginatedResponse<KeywordSearch> {}
