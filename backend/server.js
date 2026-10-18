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
        console.error('Error when receiving tasks', error.message);
        res.status(500).json({ error: 'Error when requesting the API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listens port: ${PORT}`);
})

function assertAllRequiredVariablesSet(port, apiKey)
{
    if (!port) {
        throw new Error('Port is not set. Please configure the port in the .env file');
    }

    if (!apiKey) {
        throw new Error('API key is not set. Please configure the API_KEY in the .env file');
    }
}
