import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../3-models/enums";
import { ConflictError, RouteNotFoundError, UnauthorizedError, ValidationError } from "../3-models/client-errors";
import { logger } from "../2-utils/logger";
import { appConfig } from "../2-utils/app-config";

class ErrorsMiddleware {

    // Route not found:
    public routeNotFound(request: Request, response: Response, next: NextFunction): void {

        // Create client error:
        const err = new RouteNotFoundError(request.originalUrl);

        // Go to catch-all: 
        next(err);
    }



    // Catch all: 
    public catchAll(err: any, request: Request, response: Response, next: NextFunction): void {

        // Log error to file:
        logger.logError(err);

        // Take error status and message based on error type:
        let status = StatusCode.InternalServerError;
        let message = "Some error, please try again later.";

        if (err instanceof ValidationError) {
            status = StatusCode.BadRequest;
            message = err.message;

            // Check if the validation error is related to password
            if (err.message.includes("password")) {
                message = "Invalid password. Please ensure your password meets the required criteria.";
            }

        } else if (err instanceof ConflictError) {
            status = StatusCode.Conflict;
            message = err.message;
        } else if (err instanceof UnauthorizedError) {
            status = StatusCode.Unauthorized;
            message = err.message;
        } else if (err instanceof RouteNotFoundError) {
            status = StatusCode.NotFound;
            message = err.message;
        }

        // Take error status: 
        status = err.status || StatusCode.InternalServerError;

        // Take error message: 
        message = (status === StatusCode.InternalServerError && appConfig.isProduction) ? "Some error, please try again later." : err.message;

        // Response the error:
        response.status(status).send(message);


    }
}
export const errorsMiddleware = new ErrorsMiddleware();
