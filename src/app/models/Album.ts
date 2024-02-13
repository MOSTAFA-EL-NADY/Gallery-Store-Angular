export class Album {

    constructor(
        public id: number,
        public title: string,
        public description: string | null,
        public mainImage: string | null,
        public CreatedOn: Date |null,
        public updatedOn: Date |null
    ) {


    }
}