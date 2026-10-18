require('dotenv').config();

const express = require('express'),
      cors = require('cors'),
      app = express();

const PORT    = process.env.PORT,
      API_KEY = process.env.API_KEY;

app.use(cors());
app.use(express.json());
app.use('/api/tasks', checkApiKey);

const checkApiKey = (request, result, next) => {
    const apiKey = request.headers['x-api-key'];

    if (!apiKey || apiKey !== API_KEY) {
        return request.status(401).json({ error: 'Unauthorized' });
    }

    next();
}
