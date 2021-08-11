import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeIdPipe } from './youtube-pipe/youtube-id.pipe';
import { SafePipe } from './safe/safe.pipe';
import { AddressPipe } from './address/address.pipe';


@NgModule({
  declarations: [
    YoutubeIdPipe,
    SafePipe,
    AddressPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    YoutubeIdPipe,
    SafePipe
  ],
  exports: [
    YoutubeIdPipe,
    SafePipe,
    AddressPipe
  ]
})
export class PipesModule { }
