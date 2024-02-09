import express, { Router, Express } from "express";
import { BaseRouter } from "./baseRouter.js";
import { ToDoRouterController } from "./routerController.js";
import { UserController } from "./userController.js";
import { API_URI, corsOptions, jsonBodyMiddleware, sessionObj, staticMiddleware } from "./settings.js";
import { Db } from "mongodb";
import cors from "cors";
import session from "express-session";

/**
 * Create express server with db.
 */
export class BaseServer {

    private readonly DB: Db;
    private readonly app: Express;

    public constructor(DB: Db) {
        this.DB = DB;
        this.app = express();
    }
    /**
     * Configuration the server
     * @returns application of Express.
     */
    public createServer(): Express {
        // Create controlles and router.
        const userController: UserController = new UserController(this.DB);
        const routerController: ToDoRouterController = new ToDoRouterController(this.DB);
        const baseRouter: Router = new BaseRouter(userController, routerController).createRouter();

        // Adds some midllewares
        this.app.use(jsonBodyMiddleware);
        this.app.use(staticMiddleware);
        this.app.use(cors(corsOptions));
        this.app.use(session(sessionObj));
        this.app.use(API_URI, baseRouter);

        this.app.enable('trust proxy');

        return this.app;
    }
}