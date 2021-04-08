import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { DetailMovie, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  @Input() id: string;

  detailMovie: DetailMovie;
  cast: Cast[];
  quantityHiddeLetters: number = 150;
  nameFavorite = 'star-outline'

  slideOptCast = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  }

  constructor(
    private movieService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocalService: DataLocalService
    ) { }

  ngOnInit() {

    this.dataLocalService.movieExist( this.id )
        .then( exist => this.nameFavorite = exist ? 'star' : 'star-outline' );

    this.movieService.getDetailMovie(this.id).subscribe( response => {
      this.detailMovie = response;
    })

    this.movieService.getActorsFromMovie(this.id).subscribe( response => {
      this.cast = response.cast;
    })
    
  }

  back() {
    this.modalCtrl.dismiss();
  }

  favorite() {

    const exist = this.dataLocalService.saveMovie( this.detailMovie );
    
    this.nameFavorite = exist ? 'star' : 'star-outline';

  }

}
