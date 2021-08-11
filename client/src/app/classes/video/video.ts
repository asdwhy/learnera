export class Video {

    constructor(
        public vid: string,
        public uid: string,
        public title: string,
        public body: string,
        public url: string,
        public categories: [string],
        public date: Date,
        public likes: Number
    ) {}
    
}
