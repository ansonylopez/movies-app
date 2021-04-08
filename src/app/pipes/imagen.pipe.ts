import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.imgPath

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(image: string, size: string = 'w500'): string {

    // https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png

    if (!image) {
      return './assets/no-image-banner.jpg';
    }

    const imgURL = `${ URL }/${ size }${ image }`;
    
    return imgURL;
  }

}
