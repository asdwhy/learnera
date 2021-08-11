export class Thread {

    constructor(
        public tid: string,
        public uid: string,
        public title: string,
        public body: string,
        public date: Date,
        public lastUpdated: Date,
        public likes: Number
    ) {}
    
}
