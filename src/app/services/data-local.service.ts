import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DetailMovie } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  movies: DetailMovie[] = [];

  constructor(private storage: Storage, private toastCtrl: ToastController) {
    this.loadFavorites();
  }

  saveMovie(movie: DetailMovie) {

    let exist = false;
    let message = '';

    for (const film of this.movies) {
      if (film.id === movie.id) {
        exist = true;
        break;
      }
    }

    if (exist) {
      this.movies = this.movies.filter(film => film.id !== movie.id);
      message = 'Removido de favoritos';
      this.saveInStorage();
      this.presentToast(message)
      return !exist;
    }

    this.movies.push(movie);
    message = 'Agregada a favoritos';
    this.saveInStorage();
    this.presentToast(message)

    return !exist;
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });

    toast.present();
  }

  async loadFavorites() {

    const movies = await this.storage.get('movies');
    this.movies = movies || [];
    return this.movies;
  }

  async movieExist(id) {

    await this.loadFavorites();
    const exist = this.movies.find( film => film.id === id );

    return !!exist;

  }

  private saveInStorage() {
    this.storage.set('movies', this.movies);
  }

}
