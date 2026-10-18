require('dotenv').config();

const express = require('express'),
      cors = require('cors'),
      app = express(),
      Middleware = require('./src/Middleware');

const PORT    = process.env.PORT,
      API_KEY = process.env.API_KEY;

assertAllRequiredVariablesSet(PORT, API_KEY);

app.use(cors());
app.use(express.json());

middleware = new Middleware(API_KEY);

app.use('/api/tasks', middleware.run);

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
