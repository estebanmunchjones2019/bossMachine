const checkMillionDollarIdea = (req,res,next) => {
    if (req.method === 'GET'){
        next();
    }
    if(req.method === 'DELETE'){
        if(isNaN(req.params.ideaId) || getFromDatabaseById('ideas',req.params.ideaId)){
            let error = new Error('invalid id');
            error.status = 404;
            next(error);
        }
    }
    let revenue = req.body.numWeeks * req.body.weeklyRevenue;
    if(!req.body.numWeeks || !req.body.weeklyRevenue){
        let error = new Error('Please, provide numWeeks or/and weeklyRevenue');
        error.status = 400;
        next(error);
    }
    if(isNaN(req.body.numWeeks) || isNaN(req.body.weeklyRevenue)){
        let error = new Error('Please, enter a number for numWeeks or/and weeklyRevenue');
        error.status = 400;
        next(error);
    }

    if(revenue < 1000000){
        let error = new Error('Please, come up with a more profitable idea');
        error.status = 400;
        next(error);
    }else{
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
