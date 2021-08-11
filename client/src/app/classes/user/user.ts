import { Address } from "../interfaces/address";

export class User {

    constructor(
        public firstName: string,
        public lastName: string,
        public password: string,
        public username: string,
        public ownerId: string,
        public uid: string,
        public companyName: string,
        public address: Address,
        public phone: string,
        public website: string,
        public type: string,
        public profileImageUrl: string
    ) {}
    
}
