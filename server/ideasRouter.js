const express = require('express');
const {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase} = require('./db');

const ideasRouter = express.Router();

ideasRouter.get('/', (req, res, next)=>{
let allideas = getAllFromDatabase('ideas');
res.send(allideas);
});

ideasRouter.param('ideaId',(req,res,next,id)=>{
    let idea = getFromDatabaseById('ideas',id);
    if (idea){
        req.idea = idea;
        next();
    } else {
        let error = new Error('Sorry, could found the id');
        error.status = 404;
        next(error);
    }
});

ideasRouter.use('/:ideaId',(req,res,next)=>{
    res.send(req.idea);
});


const errorHandler = (err,req,res,next) => {
    let status = err.status || 500;
    res.status(status).send(err.message);
  };
  
  ideasRouter.use(errorHandler);

module.exports = ideasRouter;