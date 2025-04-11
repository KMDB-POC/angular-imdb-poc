import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../core/models/api-response.model';
import { MovieResponse } from '../models/api/movies.model';
import { map } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  constructor(private http: HttpClient) {}

  search(query: string) {
    return this.http
      .get<ApiResponse<MovieResponse[]>>(`/search`, {
        params: { q: query },
      })
      .pipe(map((data) => data.description));
  }
}
