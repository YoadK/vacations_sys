import { appConfig } from "../2-utils/app-config";

export class SqlQueries {
    //queries to be used with the 'vacations-service.ts' --> 'getAllVacationsWithLikes' function: 

    //updating the 'vacations' table with the proper 'totalLikesCount' and 'isLikedByCurrentUser' fields:      
    static readonly updateVacationsWithLikesQuery = `
    UPDATE vacations V
    JOIN (
    -- Sub-query that retrieve the most reliable data from the 'likes' table-
    -- it gets the updated 'totalLikesCount' and 'isLikedByCurrentUser' data
    SELECT 
        vacationId,
        COUNT(*) AS totalLikesCount,
        MAX(CASE WHEN userId = ? THEN 1 ELSE 0 END) AS isLikedByCurrentUser
    FROM 
        likes
    WHERE 
    vacationId IN (SELECT id FROM vacations) -- Check that the 'vacationId' exists in the 'vacations' table
    GROUP BY 
        vacationId) 
    L ON V.id = L.vacationId
    SET 
    V.totalLikesCount = L.totalLikesCount,
    V.isLikedByCurrentUser = L.isLikedByCurrentUser;
`;

    //retrieve all vacations along with their updated 'totalLikesCount' and 'isLikedByCurrentUser' fields from the updated 'vacations' table
    static readonly getAllVacationsWithLikesQuery = `SELECT 
    V.*,
    CONCAT('${appConfig.baseImageUrl}', V.imageName) AS imageUrl,
    V.totalLikesCount,
    V.isLikedByCurrentUser
    FROM 
      vacations V
    ORDER BY 
      V.start_date;
  `;

}