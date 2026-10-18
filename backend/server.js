require('dotenv').config();

const express = require('express'),
      cors = require('cors'),
      app = express(),
      Middleware = require('./src/Middleware'),
      TodoList = require('./src/TodoList');

const PORT    = process.env.PORT,
      API_KEY = process.env.API_KEY,
      API = '/api/tasks';

assertAllRequiredVariablesSet(PORT, API_KEY);

app.use(cors());
app.use(express.json());

const middleware = new Middleware(API_KEY),
      todoList   = new TodoList();

app.use(API, middleware.run);

app.get(API, async (req, res) => {
    try {
        res.json(todoList.getAll());
    } catch (error) {
        handleApiError(res, error, 'Error when receiving tasks');
    }
});

app.post(API, async (req, res) => {
    try {
        const newTask = todoList.add(req.body.text);
        res.status(201).json(newTask);
    } catch (error) {
        handleApiError(res, error, 'Error when adding task');
    }
});

app.delete(API + '/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id),
              deleted = todoList.delete(id);

        res.sendStatus(204);
    } catch (error) {
        handleApiError(res, error, 'Error when removing task');
    }
});

app.put(API + '/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id),
              updatedTask = todoList.update(id, req.body.text);

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task wasn\'t found' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        handleApiError(res, error, 'Task update error');
    }
});

app.listen(PORT, () => {
    console.log(`Server listens port: ${PORT}`);
})

function handleApiError(res, error, message)
{
    console.error(message, error.message);
    res.status(500).json({ error: 'Error when requesting the API' });
}

function assertAllRequiredVariablesSet(port, apiKey)
{
    if (!port) {
        throw new Error('Port is not set. Please configure the port in the .env file');
    }

    if (!apiKey) {
        throw new Error('API key is not set. Please configure the API_KEY in the .env file');
    }
}
