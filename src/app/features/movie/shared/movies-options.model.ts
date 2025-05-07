export type MoviesSortOptions =
  | 'PopularityDesc'
  | 'PopularityAsc'
  | 'PrimaryReleaseDateDesc'
  | 'PrimaryReleaseDateAsc'
  | 'RevenueDesc'
  | 'RevenueAsc'
  | 'TitleDesc'
  | 'TitleAsc'
  | 'OriginalTitleDesc'
  | 'OriginalTitleAsc'
  | 'VoteAverageDesc'
  | 'VoteAverageAsc'
  | 'VoteCountDesc'
  | 'VoteCountAsc';

export interface MoviesFilterOptions {
  SortBy?: MoviesSortOptions;
  Language?: string;
  Region?: string;
  Page?: number;
  PrimaryReleaseDateGte?: string;
  PrimaryReleaseDateLte?: string;
  ReleaseDateGte?: string;
  ReleaseDateLte?: string;
  VoteAverageGte?: number;
  VoteAverageLte?: number;
  WithGenres?: string;
  WithoutGenres?: string;
  WithCast?: string;
  WithPeople?: string;
}

export interface MoviesSearchOptions {
  Query: string;
  Page?: number;
  IncludeAdult?: boolean;
  Region?: string;
  Language?: string;
  Year?: string;
  PrimaryReleaseYear?: string;
}

export interface MoviesKeywordOptions {
  Query: string;
  Page?: number;
}
