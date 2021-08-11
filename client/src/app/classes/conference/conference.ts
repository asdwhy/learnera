export class Conference {

  constructor(
    public title: string,
    public zoomLink: string,
    public date: Date,
    public meetingId: string,
    public passcode: string,
    public conId: string
  ) {}

}
