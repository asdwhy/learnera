import { YoutubeIdPipe } from './youtube-id.pipe';

describe('YoutubeIdPipe', () => {
  it('create an instance', () => {
    const pipe = new YoutubeIdPipe();
    expect(pipe).toBeTruthy();
  });
});
