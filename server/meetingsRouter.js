const express = require('express');
const {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase} = require('./db');

const meetingsRouter = express.Router();

meetingsRouter.get('/', (req, res, next)=>{
let allMeetings = getAllFromDatabase('meetings');
res.send(allMeetings);
});

meetingsRouter.param('meetingId',(req,res,next,id)=>{
    let meeting = getFromDatabaseById('minions',id);
    if (meeting){
        req.meeting = meeting;
        next();
    } else {
        let error = new Error('Sorry, could found the id');
        error.status = 404;
        next(error);
    }
});

meetingsRouter.get('/:meetingId',(req,res,next)=>{
    res.send(req.meeting);
});

meetingsRouter.post('/', (req,res,next)=>{
    let meeting = createMeeting();
    let newMeeting = addToDatabase('meetings', meeting);
    if(newMeeting){
        res.status(201).send(newMeeting);
    } else{
        let error = new Error('The meeting wasnt created, try again');
        error.status = 400;
        next(error);
    }
});

meetingsRouter.delete('/',(req,res,next)=>{
    if(deleteAllFromDatabase('meetings')){
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
  
  meetingsRouter.use(errorHandler);


module.exports = meetingsRouter;