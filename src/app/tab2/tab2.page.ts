import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../components/detail/detail.component';
import { Movie } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  stringToSearch: string;
  searching: boolean = false;
  movies: Movie[] = [];
  ideas: string[] = [
    'Spiderman',
    'Avengers',
    'El señor de los anillos',
    'La vida es bella'
  ];

  constructor( private moviesService: MoviesService, private modalCtrl: ModalController ) {}

  search(event) {
    const value: string = event.detail.value;
    if (value.length === 0) {
      this.movies = [];
      return
    }
    this.searching = true;
    this.moviesService.searchMovie(value).subscribe( response => {
      console.log(response);
      this.movies = response['results'];
      this.searching = false;
    });
  }

  async showDetail(id: string) {
    const modal = await this.modalCtrl.create({
        component: DetailComponent,
        componentProps: {
          id
        }
    })

    modal.present();
  }

}
