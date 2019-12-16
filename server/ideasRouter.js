const express = require('express');
const {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase} = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

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

ideasRouter.use('/', checkMillionDollarIdea);

ideasRouter.get('/:ideaId',(req,res,next)=>{
    res.send(req.idea);
});

ideasRouter.post('/', (req,res,next)=>{
    if(req.body){
        let newIdea = addToDatabase('ideas', req.body);
        res.status(201).send(newIdea);
    } else{
        let error = new Error('Please, fill the ideas fields');
        error.status = 400;
        next(error);
    }
});

ideasRouter.put('/:ideaId',(req,res,next)=>{
    if(req.body){
        req.body.id = req.idea.id;
        let updatedIdea = updateInstanceInDatabase('ideas', req.body);
        res.status(201).send(updatedIdea);
    }else {
        let error = new Error('Please, fill the ideas fields');
        error.status = 400;
        next(error);
    }
});

ideasRouter.delete('/:ideaId',(req,res,next)=>{
    if(deleteFromDatabasebyId('ideas', req.idea.id)){
        res.status(204).send('No Content');
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
  
  ideasRouter.use(errorHandler);

module.exports = ideasRouter;