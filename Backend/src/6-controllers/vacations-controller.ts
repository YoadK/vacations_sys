import express, { NextFunction, Request, Response } from "express";
import { vacationsService } from "../5-services/vacations-service";
import { StatusCode } from "../3-models/enums";
import { VacationModel } from "../3-models/vacation-model";
import { securityMiddleware } from "../4-middleware/security-middleware";
import { fileSaver } from "uploaded-file-saver";

// vacations controller - listens to vacation requests:
class VacationsController {

    // Create a router object for listening to HTTP requests:
    public readonly router = express.Router();

    // Register routes once: 
    public constructor() {
        this.registerRoutes();
    }

    private registerRoutes(): void {
        this.router.get("/vacations-with-likes", securityMiddleware.verifyLoggedIn, this.getAllVacationsWithLikes);
        this.router.get("/vacations", securityMiddleware.verifyLoggedIn, this.getAllVacations);
        this.router.get("/vacations/:id(\\d+)", this.getOneVacation); // \\d --> Digit, + --> One or more
        this.router.post("/vacations", securityMiddleware.verifyLoggedIn, this.addVacation);
        this.router.put("/vacations/:id(\\d+)", securityMiddleware.verifyLoggedIn, this.updateVacation);
        this.router.delete("/vacations/:id(\\d+)", securityMiddleware.verifyLoggedIn, securityMiddleware.verifyAdmin, this.deleteVacation);
        this.router.get("/vacations/images/:imageName", this.getImageFile);
        //This route would handle like update requests  (identified by id).
        this.router.put("/vacations/:id(\\d+)/like", securityMiddleware.verifyLoggedIn, this.toggleVacationLike);
       
    }

    // GET http://localhost:4000/api/vacations-with-likes
    private async getAllVacationsWithLikes(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            
            // Retrieve userId from response object
            const userId = response.locals.userId;

            // Check if userId is present
            if (!userId) {
                response.status(StatusCode.BadRequest).send("UserId is missing.");
                return;
            }
            const vacations = await vacationsService.getAllVacationsWithLikes(userId);
            
           

            response.json(vacations); // status = 200
        }
        catch (err: any) { next(err); }
    }

    //  GET http://localhost:4000/api/vacations
    private async getAllVacations(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const vacations = await vacationsService.getAllVacations();
            response.json(vacations);
        } catch (err: any) {
            next(err);
        }
    }

    // GET http://localhost:4000/api/vacations/8
    private async getOneVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = +request.params.id;
            const vacation = await vacationsService.getOneVacation(id);
            response.json(vacation); // status = 200
        }
        catch (err: any) { next(err); }
    }

    // POST http://localhost:4000/api/vacations
    private async addVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            request.body.image = request.files?.image;
            const vacation = new VacationModel(request.body);
            const addedVacation = await vacationsService.addVacation(vacation);
            response.status(StatusCode.Created).json(addedVacation);
        }
        catch (err: any) { next(err); }
    }

    // PUT http://localhost:4000/api/vacations/8
    private async updateVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            request.body.id = +request.params.id;
            request.body.image = request.files?.image;
            const vacation = new VacationModel(request.body);
            const updatedVacation = await vacationsService.updateVacation(vacation);
            response.json(updatedVacation); // Status = 200
        }
        catch (err: any) { next(err); }
    }

    // DELETE http://localhost:4000/api/vacations/8
    private async deleteVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = +request.params.id;
            await vacationsService.deleteVacation(id);
            response.sendStatus(StatusCode.NoContent); // status + send
        }
        catch (err: any) { next(err); }
    }

    // GET http://localhost:4000/api/vacations/images/:imageName
    private async getImageFile(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const imageName = request.params.imageName;
            const imagePath = fileSaver.getFilePath(imageName, true);
            response.sendFile(imagePath); // Response the actual image file.
        }
        catch (err: any) { next(err); }
    }

    // POST http://localhost:4000/api/vacations/:id(\\d+)/like
    private async toggleVacationLike(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {

            const vacationId = +request.params.id;
            const userId = response.locals.userId;

            if (!userId) {
                response.status(StatusCode.BadRequest).send("UserId is missing.");
                return;
            }

            // Check if user has already liked this vacation
            const hasLiked = await vacationsService.hasLikedVacation(vacationId, userId);

            if (hasLiked) {
                // response.status(StatusCode.Conflict).send("You already liked this vacation.");

                // Remove  a like record for the user and vacation
                const updatedVacation = await vacationsService.removeLike(vacationId, userId, hasLiked);

                response.json(updatedVacation);

                // response.sendStatus(StatusCode.Created);
                return;
            }
            else if (!hasLiked) {
                // Add a like record for the user and vacation
                const updatedVacation = await vacationsService.addLike(vacationId, userId, hasLiked);
                
                response.json(updatedVacation);

                // response.sendStatus(StatusCode.Created);
                return;
            }


        } catch (err: any) {
            next(err);
        }
    }



}

const vacationsController = new VacationsController();
export const vacationsRouter = vacationsController.router;
