export class Comment {
    constructor(
        public cid: String,
        public id: String,
        public uid: String,
        public displayName: String,
        public body: String,
        public date: Date,
        public likes: Number
    ) {}
}
