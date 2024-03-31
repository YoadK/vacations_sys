import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { VacationModel } from "../3-models/vacation-model";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "../2-utils/app-config";
import { SqlQueries } from "./sql-queries_vacations";
import HelperFunctions from "../../../Frontend/src/Components/HelperFunctionsArea/Helperfunctions";

// vacations service - handling anything with vacations: 
class VacationsService {

    // Get all vacations with their matching 'likes'
    public async getAllVacationsWithLikes(userId: number): Promise<VacationModel[]> {
        try {
            // // Delay for a specified number of milliseconds
            // setTimeout(() => {
            //     console.log("This message is shown after 10 seconds.");
            // }, 10000); 
            // debugger;
            
            await dal.execute("START TRANSACTION"); // Begin transaction

            // Step 1: Retrieve data from the 'likes' table + Update 'vacations' table with 'totalLikesCount' and 'isLikedByCurrentUser' fields:
            await dal.execute(SqlQueries.updateVacationsWithLikesQuery, [userId, userId]);

            // Step 2: Fetch all vacations with updated data
            const vacations = await dal.execute(SqlQueries.getAllVacationsWithLikesQuery);

            await dal.execute("COMMIT"); // Commit the transaction

            const formattedVacations = vacations.map(vacation => {
                debugger;
                return {
                    ...vacation,
                    start_date: HelperFunctions.getFormattedIsraeliDate(vacation.start_date),
                    end_date: HelperFunctions.getFormattedIsraeliDate(vacation.end_date),

                };
            });


            return formattedVacations;
        }
        catch (err) {
            console.error("Error executing 'getAllVacationsWithLikes'.", err);
            // Handle error appropriately, - rollback changes 
            await dal.execute("ROLLBACK"); // Rollback the transaction

        }
    }

    // Get all vacations 
    public async getAllVacations(): Promise<VacationModel[]> {
        const sql = `SELECT * FROM vacations`;

        const vacations = await dal.execute(sql);

        return vacations;
    }

    // Get one Vacation: 
    public async getOneVacation(id: number): Promise<VacationModel> {
        // Create query: 
        const sql = `SELECT *, CONCAT('${appConfig.baseImageUrl}', imageName) as imageUrl FROM vacations WHERE id = ${id}`;

        // Execute (will return array):
        const vacations = await dal.execute(sql);

        // Extract single Vacation:
        const vacation = vacations[0];

        // If Vacation doesn't exist - go to catch-all:
        if (!vacation) throw new ResourceNotFoundError(id);

        // Return:
        return vacation;
    }

    // Add new Vacation:
    public async addVacation(vacation: VacationModel): Promise<VacationModel> {

        // Validate:
        vacation.validateInsert();

        // Save image to hard-disk:
        const imageName = await fileSaver.add(vacation.image);

        // Create query: 
        const sql = `INSERT INTO vacations(destination, description,start_date , end_date, price, imageName)
            VALUES(?,?,?,?,?,?)`;

        // Execute (returns an info object containing data regarding the INSERT):
        const info: OkPacketParams = await dal.execute(sql,
            [vacation.destination, vacation.description, vacation.start_date, vacation.end_date, vacation.price, imageName]);

        // Set back to Vacation the new id: 
        // vacation.id = info.insertId;

        // Remove image from Vacation:
        // delete vacation.image;

        // Set imageUrl in Vacation object:
        // vacation.imageUrl = appConfig.baseImageUrl + imageName;

        // Instead of the above three lines - get added Vacation from the database:
        vacation = await this.getOneVacation(info.insertId);

        // Return:
        return vacation;
    }

    // Update full Vacation:
    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {

        // Validate:
        vacation.validateUpdate();

        // Get old image name: 
        const oldImageName = await this.getImageName(vacation.id);

        // Update image in the hard-disk: 
        const newImageName = vacation.image ? await fileSaver.update(oldImageName, vacation.image) : oldImageName;

        // Prepared Statement: 
        const sql = "UPDATE vacations SET destination= ?, description = ?, start_date = ?, end_date = ?, price = ?,  imageName = ?  WHERE id = ?";

        // Execute (returns an info object containing data regarding the UPDATE):
        const info: OkPacketParams = await dal.execute(sql, [vacation.destination, vacation.description, vacation.start_date, vacation.end_date
            , vacation.price, newImageName, vacation.id]);

        // If Vacation doesn't exist - go to catch-all:
        if (info.affectedRows === 0) throw new ResourceNotFoundError(vacation.id);

        // // Remove image from Vacation:
        // delete vacation.image;

        // // Set imageUrl in Vacation object:
        // vacation.imageUrl = appConfig.baseImageUrl + newImageName;

        // Instead of the above two lines - get updated Vacation from the database:
        vacation = await this.getOneVacation(vacation.id);

        // Return:
        return vacation;
    }

    // Delete Vacation: 
    public async deleteVacation(id: number): Promise<void> {
        debugger;
        // Get image name from database for later delete:
        const imageName = await this.getImageName(id);

        // Create query: 
        const sql = `DELETE FROM vacations WHERE id = ?`;

        // Execute (returns an info object containing data regarding the DELETE):
        const info: OkPacketParams = await dal.execute(sql, [id]);

        // If Vacation doesn't exist - go to catch-all:
        if (info.affectedRows === 0) throw new ResourceNotFoundError(id);

        // Delete image from hard-disk:
        await fileSaver.delete(imageName);
    }

    // Get image name from database: 
    private async getImageName(id: number): Promise<string> {

        // Create sql:
        const sql = `SELECT imageName FROM vacations WHERE id = ?`;

        // Execute: 
        const vacations = await dal.execute(sql, [id]);

        // Extract Vacation: 
        const vacation = vacations[0];

        // Return null if not found:
        if (!vacation) return null;

        // Extract imageName: 
        const imageName = vacation.imageName;

        // Return:
        return imageName;
    }



    public async hasLikedVacation(vacationId: number, userId: number): Promise<boolean> {
        const sql = "SELECT COUNT(*) > 0 AS hasLiked FROM likes WHERE vacationId = ? AND userId = ?";
        const results = await dal.execute(sql, [vacationId, userId]);
        return results[0].hasLiked;
    }

    // Update likes count:
    public async updateLikesCountInDb(vacationId: number, userId: number, isLiked: boolean): Promise<void> {
        try {
            if (isLiked) {
                // Insert a new like record
                const sql = "INSERT INTO likes (vacationId, userId) VALUES (?, ?)";
                await dal.execute(sql, [vacationId, userId]);

                // // Update the like count
                // const updateCountSql =
                //   "UPDATE vacations SET total_likes_count = total_likes_count + 1 WHERE id = ?";
                // await dal.execute(updateCountSql, [vacationId]);
            } else {
                // Delete the existing like record (if it exists)
                const sql = "DELETE FROM likes WHERE vacationId = ? AND userId = ?";
                await dal.execute(sql, [vacationId, userId]);

                // // Update the like count
                // const updateCountSql =
                //   "UPDATE vacations SET total_likes_count = total_likes_count - 1 WHERE id = ? AND total_likes_count > 0";
                // await dal.execute(updateCountSql, [vacationId]);
            }
        } catch (error) {
            console.error("Error updating like count to DB:", error);
            // Handle error appropriately, e.g., rollback changes or retry
        }
    }


    public async addLike(vacationId: number, userId: number, isLiked: boolean): Promise<VacationModel> {
        //updating 'like' status
        await dal.execute("INSERT INTO likes (vacationId, userId) VALUES (?, ?)", [vacationId, userId]);

        // Update totalLikes count
        await dal.execute("UPDATE vacations SET totalLikesCount = totalLikesCount + 1, isLikedByCurrentUser=true WHERE id = ?", [vacationId]);

        //  get updated version of 'Vacation' from the database:
        const vacation = await this.getOneVacation(vacationId);


        // Return:
        return vacation;


    }


    public async removeLike(vacationId: number, userId: number, isLiked: boolean) {
        //updating 'like' status
        await dal.execute("DELETE FROM likes WHERE vacationId = ? AND userId = ?", [vacationId, userId]);

        // Update totalLikes count
        await dal.execute("UPDATE vacations SET totalLikesCount = totalLikesCount - 1, isLikedByCurrentUser=false WHERE id = ? AND totalLikesCount > 0", [vacationId]);

        //  get updated version of 'Vacation' from the database:
        const vacation = await this.getOneVacation(vacationId);

        // Return:
        return vacation;
    }



}

export const vacationsService = new VacationsService();
