import { Db } from "mongodb";
import { HTTP_CODES, HTTP_MESSAGES } from "./settings.js";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';


export class UserController {

    private db: Db;

    public constructor(db: Db) {
        this.db = db;
    }

    public async register(req: Request, res: Response): Promise<void> {
        const { login: username, pass: password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const clients = this.db.collection('clients');
        const user = await clients.findOne({ username: username });

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

    public async login(req: Request, res: Response): Promise<void> {
        const { login: username, pass: password } = req.body;

        const clients = this.db.collection('clients');
        const user = await clients.findOne({ "username": username });

        if (!user) {
            res.status(HTTP_CODES.BAD_REQUEST).json({ "error": HTTP_MESSAGES.BAD_REQUEST });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user!.password);

        if (!isPasswordValid) {
            res.status(HTTP_CODES.BAD_REQUEST).json({ "error": HTTP_MESSAGES.BAD_REQUEST });
            return;
        }

        req.session.user = username;

        res.json({ "ok": true });
    }

    public logout(req: Request, res: Response): void {
        req.session.user = null;
        res.json({ "ok": true });
    }
}