import { Db, ObjectId } from "mongodb";
import { HTTP_CODES, HTTP_MESSAGES } from "./settings.js";
import { Request, Response } from 'express';

/**
 * Class create todo router controller.
 */
export class ToDoRouterController {

    private readonly db: Db;

    public constructor(db: Db) {
        this.db = db;
    }

    /**
     * Gets all todo by the user.
     * @param req Express request object
     * @param res Express response object
     */
    public async getItems(req: Request, res: Response): Promise<void> {
        // Checks if the user is logged in
        if (req.session.user) {
            const user = await this.db.collection('clients').findOne({ "username": req.session.user });
            if (user) {
                res.json({ items: user.todos });
            }
        } else {
            res.json({ items: [] });
        }
    }

    /**
     * Adds a todo to the Db collection.
     * @param req Express request object
     * @param res Express response object
     */
    public async addItem(req: Request, res: Response): Promise<void> {
        // Checks if the user is logged in
        if (req.session.user) {
            const todoId = await this.addToDo(req);
            res.json({ "id": todoId });
        } else {
            res.sendStatus(HTTP_CODES.BAD_REQUEST).json({ "error": HTTP_MESSAGES.BAD_REQUEST });
        }
    }
    /**
     * Edits a todo from the Db collection.
     * @param req Express request object
     * @param res Express response object
     */
    public async editItem(req: Request, res: Response): Promise<void> {
        // Checks if the user is logged in
        if (req.session.user) {
            await this.editToDo(req);
            res.json({ "ok": true });
        } else {
            res.sendStatus(HTTP_CODES.BAD_REQUEST).json({ "error": HTTP_MESSAGES.BAD_REQUEST });
        }
    }

    /**
     * Delete a todo from the Db collection.
     * @param req Express request object
     * @param res Express response object
     */
    public async deleteItem(req: Request, res: Response): Promise<void> {
        // Checks if the user is logged in
        if (req.session.user) {
            await this.deleteToDo(req)
            res.json({ "ok": true });
        } else {
            res.sendStatus(HTTP_CODES.BAD_REQUEST).json({ "error": HTTP_MESSAGES.BAD_REQUEST });
        }
    }

    /**
     * Sends a request to the database to delete todo
     * @param req Express request object
     */
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

    /**
     * Sends a request to the database to edit todo
     * @param req Express request object
     */
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

    /**
     * Sends a request to the database to add todo
     * @param req Express request object
     */
    private async addToDo(req: Request): Promise<ObjectId> {
        let todoId = new ObjectId();

        await this.db.collection('clients').updateOne(
            { "username": req.session.user },
            { $push: { todos: { id: todoId, text: req.body.text, checked: false } } }
        );

        return todoId;
    }
}