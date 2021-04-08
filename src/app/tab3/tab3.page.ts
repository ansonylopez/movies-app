import { Component } from '@angular/core';
import { DetailMovie, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  movies: DetailMovie[] = [];
  genres: Genre[] = [];
  moviesPerGenre: any[] = [];

  constructor(
    private dataLocalService: DataLocalService,
    private movieService: MoviesService
    ) {}

  async ionViewWillEnter() {
    await this.dataLocalService.loadFavorites().then( movies => this.movies = movies)

    await this.movieService.loadGenres().then( genres => this.genres = genres)

    this.moviesPerGenres(this.genres, this.movies);
    
  }

  moviesPerGenres(genres: Genre[], movies: DetailMovie[]) {
    this.moviesPerGenre = [];
    
    genres.forEach( genre => {

      let moviesByGenre: DetailMovie[] = movies.filter( movie =>  {
        return movie.genres.find(genreForMovie => genreForMovie.name === genre.name);
      });
      
      if (moviesByGenre.length > 0) { 
        this.moviesPerGenre.push({
          'genre_name': genre.name,
          'movies': moviesByGenre
        })
      }
    })

  }

}
