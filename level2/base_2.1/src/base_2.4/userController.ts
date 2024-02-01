import { userAuthentication } from "./server.js";
import { validateUserLoginRequestBody } from "./validators.js";
import { Request, Response } from 'express';

export class UserController {

    public register(req: Request, res: Response) {
        if (validateUserLoginRequestBody(req)) {
            const { login: user, pass: password }: { login: string, pass: string } = req.body;

            req.session.user = {
                username: user,
                password: password
            };

            res.json({ "ok": true });
        } else {
            res.status(400).json({ "error": "Bad request" })
        }
    }

    public login(req: Request, res: Response) {
        userAuthentication(req, res);
    }

    public logout(req: Request, res: Response) {
        res.json({ "ok": true });
    }
}