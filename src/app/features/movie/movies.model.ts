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

export interface MovieSearchResponse {
  page: number;
  results: MovieResponse[];
  total_pages: number;
  total_results: number;
}
