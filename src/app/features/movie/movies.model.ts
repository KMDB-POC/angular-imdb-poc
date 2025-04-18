import { PaginatedResponse } from '@core/models/paginated-response.model';

export interface MovieResponse {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  original_language: string;
  release_date: string; //ex: 2025-04-15
  backdrop_path: string;
  poster_path: string;
  genre_ids: number[];
  popularity: number;
  vote_average: 0;
  vote_count: 0;
  video: false;
  adult: boolean;
}

export interface MovieSearchResponse extends PaginatedResponse<MovieResponse> {}

export interface KeywordSearch {
  id: number;
  name: string;
}

export interface KeywordSearchResponse
  extends PaginatedResponse<KeywordSearch> {}
