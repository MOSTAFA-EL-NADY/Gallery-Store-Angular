export class AlbumImage{

    constructor(
        public id: number,
        public name: string,
        public description: string | null,
        public url: string,
        public sizeInMB: number,
        public type: string,
        public CreatedOn: Date |null,
        public updatedOn: Date|null
    ) {
       
        
    }

}