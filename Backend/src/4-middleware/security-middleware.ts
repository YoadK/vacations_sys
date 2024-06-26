import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../3-models/enums";
import { cyber } from "../2-utils/cyber";
import { UnauthorizedError } from "../3-models/client-errors";
import striptags from "striptags"; // npm i striptags

class SecurityMiddleware {

    // Check black list IPs:
    public checkBlackList(request: Request, response: Response, next: NextFunction): void {

        // Demo for database loading:
        const blackListIPs = ["180.3.57.4", "12.56.45.78", /* "::1", */ "190.12.45.78"];

        // If user includes in the black list: 
        if (blackListIPs.includes(request.ip)) {
            response.status(StatusCode.Forbidden).send("You are not allowed.");
        }
        else {
            // Continue to next middleware or controller:
            next();
        }
    }

    // Verify user logged in (authorization: "Bearer <the-token>"):
    //                                        01234567
    public verifyLoggedIn(request: Request, response: Response, next: NextFunction): void {

        // Get authorization header
        const authorizationHeader = request.header("authorization");

        // Check if authorization header exists and has the correct format
        if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
            // Extract the token
            const token = authorizationHeader.substring(7); // Remove "Bearer " prefix

            // Verify token and extract userId
            const userId = cyber.extractUserIdFromToken(token);

            // Attach userId to locals object
            response.locals.userId = userId;

            // Continue to the next middleware or controller
            next();
        } else {
            // If token is invalid or missing, send unauthorized error
            const err = new UnauthorizedError("You are not logged in.");
            next(err);
        }
    }

    // Verify admin:
    public verifyAdmin(request: Request, response: Response, next: NextFunction): void {

        // Get authorization header: 
        const authorizationHeader = request.header("authorization");

        // Get the token:
        const token = authorizationHeader?.substring(7); // 7 --> token index

        // If user is not admin:
        if (!cyber.isAdmin(token)) {
            const err = new UnauthorizedError("You are not authorized.");
            next(err);
        }
        else {
            next();
        }
    }

    // When to skip rate limit:
    public skipRateLimit(request: Request, response: Response): boolean {
        return request.originalUrl.startsWith("/api/vacations/images/");
    }

    // Strip tags from any give string:
    public sanitizeXss(request: Request, response: Response, next: NextFunction): void {

        // Run on request body:
        for (const prop in request.body) {
            if (typeof request.body[prop] === "string") {
                request.body[prop] = striptags(request.body[prop]); // <h1>Apple</h1> ==> Apple
            }
        }

        // Continue to next middleware:
        next();
    }

}

export const securityMiddleware = new SecurityMiddleware();
