import express, { Request, Response, Router } from 'express';
import { UserController } from './userController.js';
import { ToDoRouterController } from './routerController.js';

/**
 * Class creates the base router
 */
export class BaseRouter {
    private readonly uC: UserController;
    private readonly rC: ToDoRouterController;
    private readonly router: Router;
    private readonly routerUri: string = "/router";
    /**
     * Constructor gets two parameters
     * and create the new router object.
     * @param userController 
     * @param routerController 
     */
    public constructor(userController: UserController, routerController: ToDoRouterController) {
        this.uC = userController;
        this.rC = routerController;
        this.router = express.Router();
    }

    /**
     * Configures the router. Creates some new routings.
     * @returns instance of Router
     */
    public createRouter(): Router {
        this.router.post(this.routerUri, (req: Request, res: Response) => {
            // Get action from request.
            const action = req.query.action;

            switch (action) {
                case "getItems":
                    this.rC.getItems(req, res);
                    break;
                case "createItem":
                    this.rC.addItem(req, res);
                    break;
                case "editItem":
                    this.rC.editItem(req, res);
                    break;
                case "deleteItem":
                    this.rC.deleteItem(req, res);
                    break;
                case "register":
                    this.uC.register(req, res);
                    break;
                case "login":
                    this.uC.login(req, res);
                    break;
                case "logout":
                    this.uC.logout(req, res);
                    break;
            }
        });
        return this.router;
    }
}
