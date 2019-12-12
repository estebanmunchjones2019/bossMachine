const express = require('express');
const {getAllFromDatabase} = require('./db');

const meetingsRouter = express.Router();

meetingsRouter.get('/', (req, res, next)=>{
let allMeetings = getAllFromDatabase('meetings');
res.send(allMeetings);
})

module.exports = meetingsRouter;