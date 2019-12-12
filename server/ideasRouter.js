const express = require('express');
const {getAllFromDatabase} = require('./db');

const ideasRouter = express.Router();

ideasRouter.get('/', (req, res, next)=>{
let allideas = getAllFromDatabase('ideas');
res.send(allideas);
})

module.exports = ideasRouter;