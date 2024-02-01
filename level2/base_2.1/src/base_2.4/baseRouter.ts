import express, { Request, Response, Router } from 'express';
import { UserController } from './userController.js';
import { RouterController } from './routerController.js';


export class BaseRouter {
    private uC: UserController;
    private rC: RouterController;
    private router: Router;

    public constructor(userController: UserController, routerController: RouterController) {
        this.uC = userController;
        this.rC = routerController;
        this.router = express.Router();
    }

    public createRouter(): Router {
        this.router.post('/router', (req: Request, res: Response) => {
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
