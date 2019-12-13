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


const errorHandler = (err,req,res,next) => {
    let status = err.status || 500;
    res.status(status).send(err.message);
  };
  
  minionsRouter.use(errorHandler);



module.exports = minionsRouter;