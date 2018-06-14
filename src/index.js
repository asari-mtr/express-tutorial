import express from 'express';
import config from './config/config.js';
import router from './routers.js';

let app = express();

config(express, app);
router(app);

app.listen(process.env.PORT || 3000);
