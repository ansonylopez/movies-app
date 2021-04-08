import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageFilter'
})
export class ImageFilterPipe implements PipeTransform {

  transform(movies: any[]): any[] {

    if (movies) {
      return movies.filter( movie => {
        return movie.backdrop_path;
      })
    }

  }

}
