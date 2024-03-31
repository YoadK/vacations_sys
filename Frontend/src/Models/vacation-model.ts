
export class VacationModel {
    id: number;
    destination: string;
    description: string;
    start_date: string;
    end_date: string;
    price: number;
    
   
    imageUrl: string;
    image: File;

    isLikedByCurrentUser:boolean;
    totalLikesCount:number

}



