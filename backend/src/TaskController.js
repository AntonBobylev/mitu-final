const express  = require('express'),
    TodoList = require('./TodoList');

class TaskController
{
    constructor()
    {
        this.todoList = new TodoList;
        this.router = express.Router();

        this.initRoutes();
    }

    // Вспомогательный метод для проверки текста задачи
    isValidText(text)
    {
        return typeof text === 'string' && text.trim().length > 0;
    }

    initRoutes()
    {
        this.router.get('/', async (req, res) => {
            try {
                res.json(this.todoList.getAll());
            } catch (error) {
                this.handleApiError(res, error, 'Error when receiving tasks');
            }
        });

        this.router.post('/', async (req, res) => {
            try {
                const { text } = req.body;

                // Проверяем, что текст передан, является строкой и не состоит из одних пробелов
                if (!this.isValidText(text)) {
                    return res.status(400).json({ error: 'Invalid or missing task text' });
                }

                const newTask = this.todoList.add(text.trim());
                res.status(201).json(newTask);
            } catch (error) {
                this.handleApiError(res, error, 'Error when adding task');
            }
        });

        this.router.delete('/:id', async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                this.todoList.delete(id);
                res.sendStatus(204);
            } catch (error) {
                this.handleApiError(res, error, 'Error when removing task');
            }
        });

        this.router.put('/:id', async (req, res) => {
            try {
                const id = parseInt(req.params.id),
                    { text, completed } = req.body;

                if (text !== undefined && !this.isValidText(text)) {
                    return res.status(400).json({ error: 'Invalid task text' });
                }

                if (completed !== undefined && typeof completed !== 'boolean') {
                    return res.status(400).json({ error: 'Invalid completed status (must be boolean)' });
                }

                if (text === undefined && completed === undefined) {
                    return res.status(400).json({ error: 'No valid fields provided for update' });
                }

                const updatedTask = this.todoList.update(id, req.body);

                if (!updatedTask) {
                    return res.status(404).json({ error: 'Task wasn\'t found' });
                }

                res.status(200).json(updatedTask);
            } catch (error) {
                this.handleApiError(res, error, 'Task update error');
            }
        });
    }

    handleApiError(res, error, message)
    {
        console.error(message, error.message);
        res.status(500).json({ error: 'Error when requesting the API' });
    }

    getRouter()
    {
        return this.router;
    }
}

module.exports = TaskController;
