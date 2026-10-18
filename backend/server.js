require('dotenv').config();

const express = require('express'),
      cors = require('cors'),
      app = express();

app.use(cors());
app.use(express.json());

const PORT    = process.env.PORT,
      API_KEY = process.env.API_KEY;
