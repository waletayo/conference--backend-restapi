"use strict";
import logger from "./src/util/logger";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import express from "express";
import config from "config";
import talkroute from "./src/api/talk/talk.route";
import attendee from "./src/api/attendee/attendee.route";


const port = process.env.PORT || config.get("app.port");
const prefix = config.get("api.prefix");
const db = config.get("database.url");
const app = express();
app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization,x-api-key");
    next();
});
app.use(bodyParser.json());
app.use(prefix, talkroute);
app.use(prefix, attendee);

app.use(bodyParser.urlencoded({extended: false}));

app.listen(port, logger.log("listing on port", port));
mongoose.connect(db)
    .then(() => logger.log("connected to mongoDB", db))
    .catch(err => logger.log("error mongodb", err));

