import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from '../../interfaces/interfaces';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-slideshows-pairs',
  templateUrl: './slideshows-pairs.component.html',
  styleUrls: ['./slideshows-pairs.component.scss'],
})
export class SlideshowsPairsComponent implements OnInit {

  @Input() movies: Movie[] = [];
  @Output() loadMore = new EventEmitter();

  slidesOptions = {
    slidesPerView: 4,
    freeMode: true,
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  loadMoreMovies() {
    this.loadMore.emit();
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
