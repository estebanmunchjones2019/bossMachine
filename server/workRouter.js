const express = require('express');
const {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase} = require('./db');
const workRouter = express.Router();

workRouter.param('workId',(req,res,next,id)=>{
    let work = getFromDatabaseById('work',id);
    if (work){
        req.work = work;
        
        next();
    } else {
        let error = new Error('Sorry, could found the id');
        error.status = 404;
        next(error);
    }
});

workRouter.get('/',(req,res,next)=>{
    let allWork = getAllFromDatabase('work');
    res.send(allWork);
});

workRouter.post('/',(req,res,next)=>{
    if(req.body){
        req.body.minionId = req.minion.id;
        let newWork = addToDatabase('work', req.body);
        res.status(201).send(newWork);
    } else{
        let error = new Error('Please, fill the work fields');
        error.status = 400;
        next(error);
    }
});

workRouter.put('/:workId',(req,res,next)=>{
    req.body.id = req.work.id;
    req.body.minionId = req.work.minionId;
    let updatedWork = updateInstanceInDatabase('work', req.body);
    if (updatedWork){
        res.send(updatedWork);
    } else {
        let error = new Error('Please, fill the minions fields');
        error.status = 400;
        next(error);
    }
});

workRouter.delete('/:workId',(req,res,next)=>{
    if(deleteFromDatabasebyId('work', req.work.id)){
        res.status(204).send();
    }else {
        let error = new Error('Could not delete the resource');
        error.status = 404;
        next(error);
    }
});

const errorHandler = (err,req,res,next) => {
    let status = err.status || 500;
    res.status(status).send(err.message);
  };
  
  workRouter.use(errorHandler);

module.exports = workRouter;