const express = require('express');
const {getAllFromDatabase} = require('./db');

const minionsRouter = express.Router();

minionsRouter.get('/', (req, res, next)=>{
let allMinions = getAllFromDatabase('minions');
res.send(allMinions);
});

minionsRouter.param('minionId',(req,res,next,id)=>{
    if (getFromDatabaseById('minions',id)){
        req.id = id;
        next();
    } else {
        
    }
})

module.exports = minionsRouter;