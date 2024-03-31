export class LikesModel {    
    userId: number;
    vacationId: number;    

    public constructor(likesModel?: LikesModel) {
    
        this.userId = likesModel?.userId;
        this.vacationId = likesModel?.vacationId;
        
    }
}


