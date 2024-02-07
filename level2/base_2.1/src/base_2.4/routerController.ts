import { Db, ObjectId } from "mongodb";
import { HTTP_CODES, HTTP_MESSAGES } from "./settings.js";
import { Request, Response } from 'express';


export class RouterController {

    private db: Db;

    public constructor(db: Db) {
        this.db = db;
    }

    public async getItems(req: Request, res: Response): Promise<void> {
        if (req.session.user) {
            const user = await this.db.collection('clients').findOne({ "username": req.session.user });
            if (user) {
                res.json({ items: user.todos });
            }
        } else {
            res.json({ items: [] });
        }
    }

    public async addItem(req: Request, res: Response): Promise<void> {
        if (req.session.user) {
            const todoId = await this.addToDo(req);
            res.json({ "id": todoId });
        } else {
            res.sendStatus(HTTP_CODES.BAD_REQUEST).json({ "error": HTTP_MESSAGES.BAD_REQUEST });
        }
    }

    public async editItem(req: Request, res: Response): Promise<void> {
        if (req.session.user) {
            await this.editToDo(req);
            res.json({ "ok": true });
        } else {
            res.sendStatus(HTTP_CODES.BAD_REQUEST).json({ "error": HTTP_MESSAGES.BAD_REQUEST });
        }
    }

    public async deleteItem(req: Request, res: Response): Promise<void> {
        if (req.session.user) {
            await this.deleteToDo(req)
            res.json({ "ok": true });
        } else {
            res.sendStatus(HTTP_CODES.BAD_REQUEST).json({ "error": HTTP_MESSAGES.BAD_REQUEST });
        }
    }

    private async deleteToDo(req: Request): Promise<void> {
        await this.db.collection('clients').updateOne(
            {
                "username": req.session.user
            },
            {
                $pull: {
                    todos: {
                        id: new ObjectId(<string>req.body.id),
                    }
                }
            }
        );
    }

    private async editToDo(req: Request): Promise<void> {
        await this.db.collection('clients').updateOne(
            {
                "username": req.session.user,
                "todos.id": new ObjectId(<string>req.body.id)
            },
            {
                $set: {
                    'todos.$.text': req.body.text,
                    'todos.$.checked': req.body.checked,
                }
            }
        );
    }

    private async addToDo(req: Request): Promise<ObjectId> {
        let todoId = new ObjectId();

        await this.db.collection('clients').updateOne(
            { "username": req.session.user },
            { $push: { todos: { id: todoId, text: req.body.text, checked: false } } }
        );

        return todoId;
    }
}