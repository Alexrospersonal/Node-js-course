import { Db } from "mongodb";
import { HTTP_CODES, HTTP_MESSAGES } from "./settings.js";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

/**
 * Controller for users auth request.
 */
export class UserController {

    private readonly db: Db;
    private readonly dbCollection: string = 'clients';

    public constructor(db: Db) {
        this.db = db;
    }
    /**
     * Register a new user.
     * @param req Express request object
     * @param res Express response object
     */
    public async register(req: Request, res: Response): Promise<void> {
        const { login: username, pass: password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        // Gets user from Db.
        const clients = this.db.collection(this.dbCollection);
        const user = await clients.findOne({ username: username });

        // If user not exists, create a new user.
        if (user === null) {
            await clients.insertOne({
                username,
                password: hashedPassword,
                todos: []
            });

            res.json({ "ok": true });
        } else {
            res.status(HTTP_CODES.BAD_REQUEST).json({ "error": HTTP_MESSAGES.BAD_REQUEST })
        }

    }

    /**
     * User login
     * @param req Express request object
     * @param res Express response object
     * @returns 
     */
    public async login(req: Request, res: Response): Promise<void> {
        const { login: username, pass: password } = req.body;

        // Gets user from Db.
        const clients = this.db.collection(this.dbCollection);
        const user = await clients.findOne({ "username": username });

        if (!user) {
            res.status(HTTP_CODES.BAD_REQUEST).json({ "error": HTTP_MESSAGES.BAD_REQUEST });
            return;
        }

        // Compare passwords.
        const isPasswordValid = await bcrypt.compare(password, user!.password);

        if (!isPasswordValid) {
            res.status(HTTP_CODES.BAD_REQUEST).json({ "error": HTTP_MESSAGES.BAD_REQUEST });
            return;
        }

        // Adds user to session.
        req.session.user = username;

        res.json({ "ok": true });
    }

    /**
     * Logout user from session
     * @param req Express request object
     * @param res Express response object
     */
    public logout(req: Request, res: Response): void {
        req.session.user = null;
        res.json({ "ok": true });
    }
}