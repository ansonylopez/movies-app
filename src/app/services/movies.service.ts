import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseMovieDB, DetailMovie, creditsResponse, Genre } from '../interfaces/interfaces';

const URL = environment.url;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  popularsPage: number = 0;
  genres: Genre[] = [];

  constructor(private http: HttpClient) { }


  getFeature() {

    const today = new Date();
    const lastDay = new Date( today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const month = today.getMonth() + 1;

    let monthString = month < 10 ? '0' + month : month;

    const startDate = `${ today.getFullYear() }-${ monthString }-01`;
    const lastDate = `${ today.getFullYear() }-${ monthString }-${ lastDay }`;


    return this.executeQuery<ResponseMovieDB>(`/discover/movie?primary_release_date.gte=${startDate}&primary_release_date.lte=${lastDate}`)
  }

  getPopulars() {
        this.popularsPage++;

        const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularsPage }`

        return this.executeQuery<ResponseMovieDB>(query);
  }

  getDetailMovie(id: string) {
    return this.executeQuery<DetailMovie>(`/movie/${id}?a=1`)
  }

  getActorsFromMovie( movieId: string ) {
    return this.executeQuery<creditsResponse>(`/movie/${movieId}/credits?a=1`);
  }

  searchMovie(param: string) {
      return this.executeQuery(`/search/movie?query=${ param }`);
  }

  loadGenres(): Promise<Genre[]> {

    return new Promise( resolve => {
      this.executeQuery(`/genre/movie/list?a=1`)
      .subscribe( response =>  {
        this.genres = response['genres']
        
        resolve(this.genres);
      })
    })
  }

  private executeQuery<Type>( query: string) {

    query = URL + query;

    query += `&api_key=${API_KEY}&language=es&include_image_language=es`;
    
    return this.http.get<Type>( query );
  }

}
