import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'youtubeId'
})
export class YoutubeIdPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    var regExp = /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
    var match = value.match(regExp) || "";
    let id = match[1];
    return id;
  }

}
