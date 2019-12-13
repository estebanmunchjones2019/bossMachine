const express = require('express');
const {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase} = require('./db');

const minionsRouter = express.Router();

minionsRouter.get('/', (req, res, next)=>{
let allMinions = getAllFromDatabase('minions');
res.send(allMinions);
});

minionsRouter.param('minionId',(req,res,next,id)=>{
    let minion = getFromDatabaseById('minions',id);
    if (minion){
        req.minion = minion;
        next();
    } else {
        let error = new Error('Sorry, could found the id');
        error.status = 404;
        next(error);
    }
});

minionsRouter.use('/:minionId',(req,res,next)=>{
    res.send(req.minion);
});

minionsRouter.post('/', (req,res,next)=>{
    if(req.body){
        let newMinion = addToDatabase('minions', req.body);
        res.send(newMinion);
    } else{
        let error = new Error('Please, fill the minions fields');
        error.status = 400;
        next(error);
    }
});

const errorHandler = (err,req,res,next) => {
    let status = err.status || 500;
    res.status(status).send(err.message);
  };
  
  minionsRouter.use(errorHandler);



module.exports = minionsRouter;