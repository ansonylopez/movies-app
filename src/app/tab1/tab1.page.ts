import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  currentMovies: Movie[];
  popularity: Movie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {

    this.moviesService.getFeature()
        .subscribe( response => {
          this.currentMovies = response.results;
        });
      
    this.getPopulars();

  }

  loadMore() {
    this.getPopulars();
    
  }

  private getPopulars() {
    this.moviesService.getPopulars().subscribe( response => {

      const arrayTemp = [...this.popularity, ...response.results];

      this.popularity = arrayTemp;
  });
  }

}
