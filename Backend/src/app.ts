import express from "express";
import expressFileUpload from "express-fileupload";
import path from "path";
import fs from "fs";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "./2-utils/app-config";
import { errorsMiddleware } from "./4-middleware/errors-middleware";
import { securityMiddleware } from "./4-middleware/security-middleware";
import { authRouter } from "./6-controllers/auth-controller";
import cors from "cors";
import expressRateLimit from "express-rate-limit";
import https from "https";
import { vacationsRouter } from "./6-controllers/vacations-controller";

// Main application class:
class App {

    // Express server: 
    private server = express();

    // Start app:
    public start(): void {

        // Rate limit:
        this.server.use(expressRateLimit({
            windowMs: 1000,
            limit: 10,
            skip: securityMiddleware.skipRateLimit
        }));

        // Enable CORS requests:
        this.server.use(cors()); // Enable CORS for any frontend website.
        // this.server.use(cors({origin: "http://localhost:3000"})); // Enable CORS only for this website.
        // this.server.use(cors({origin: ["http://localhost:3000", "http://whatever.com", "http://cute-kittens.co.il"]})); // Enable CORS only for those websites.

        // Create a request.body containing the given json from the front:
        this.server.use(express.json());

        // Create request.files containing uploaded files: 
        this.server.use(expressFileUpload());

        // Sanitize XSS:
        this.server.use(securityMiddleware.sanitizeXss);

        // Configure images folder: 
        fileSaver.config(path.join(__dirname, "1-assets", "images"));

        // Register middleware:
        // this.server.use(loggerMiddleware.logToConsole);
        this.server.use(securityMiddleware.checkBlackList);

        // Connect any controller route to the server:
        this.server.use("/api", authRouter, vacationsRouter);

        // Route not found middleware: 
        this.server.use(errorsMiddleware.routeNotFound);

        // Catch all middleware: 
        this.server.use(errorsMiddleware.catchAll);

        // Run HTTP server on development: 
        if (appConfig.isDevelopment) {
            this.server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
            return;
        }

        // Run HTTPS server on production:
        const options = {
            cert: fs.readFileSync(path.join(__dirname, "1-assets", "cert", "localhost-2024-02-18-090309.cer")),
            key: fs.readFileSync(path.join(__dirname, "1-assets", "cert", "localhost-2024-02-18-090309.pkey")),
        };
        const sslServer = https.createServer(options, this.server); // SSL = Secure Socket Layer
        sslServer.listen(appConfig.port, () => console.log(`Listening on https://localhost:${appConfig.port}`)); // 443
    }

}

const app = new App();
app.start();
