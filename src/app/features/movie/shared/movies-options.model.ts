export type MoviesSortOptions =
  | 'popularity.desc'
  | 'popularity.asc'
  | 'primary_release_date.desc'
  | 'primary_release_date.asc'
  | 'revenue.desc'
  | 'revenue.asc'
  | 'title.desc'
  | 'title.asc'
  | 'original_title.desc'
  | 'original_title.asc'
  | 'vote_average.desc'
  | 'vote_average.asc'
  | 'vote_count.desc'
  | 'vote_count.asc';

export interface MoviesFilterOptions {
  sort_by?: MoviesSortOptions;
  language?: string;
  region?: string;
  page?: number;
  'primary_release_date.gte'?: string;
  'primary_release_date.lte'?: string;
  'release_date.gte'?: string;
  'release_date.lte'?: string;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  with_genres?: string;
  without_genres?: string;
  with_cast?: string;
  with_people?: string;
}

export interface MoviesSearchOptions {
  query: string;
  page?: number;
  include_adult?: boolean;
  region?: string;
  language?: string;
  year?: string;
  primary_release_year?: string;
}
