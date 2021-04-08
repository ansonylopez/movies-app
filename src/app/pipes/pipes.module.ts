import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { PairsPipe } from './pairs.pipe';
import { ImageFilterPipe } from './image-filter.pipe';


@NgModule({
  declarations: [ImagenPipe, PairsPipe, ImageFilterPipe],
  imports: [
    CommonModule
  ],
  exports: [
    ImagenPipe,
    PairsPipe,
    ImageFilterPipe
  ]
})
export class PipesModule { }
