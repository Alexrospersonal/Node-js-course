import express, { Router, Express } from "express";
import { BaseRouter } from "./baseRouter.js";
import { RouterController } from "./routerController.js";
import { UserController } from "./userController.js";
import { API_URI, corsOptions, jsonBodyMiddleware, sessionObj, staticMiddleware } from "./settings.js";
import { Db } from "mongodb";
import cors from "cors";
import session from "express-session";

export class BaseServer {

    private DB: Db;
    private app: Express;

    public constructor(DB: Db) {
        this.DB = DB;
        this.app = express();
    }

    public createServer(): Express {
        const userController: UserController = new UserController(this.DB);
        const routerController: RouterController = new RouterController(this.DB);
        const baseRouter: Router = new BaseRouter(userController, routerController).createRouter();

        this.app.use(jsonBodyMiddleware);
        this.app.use(staticMiddleware);
        this.app.use(cors(corsOptions));
        this.app.use(session(sessionObj));
        this.app.use(API_URI, baseRouter);

        this.app.enable('trust proxy');

        return this.app;
    }
}