const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;

const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    createMeeting
} = require('./db')


//Get all meetings
meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'))
})

//Create new meeting
meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
})


//Delete idea
meetingsRouter.delete('/', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('meetings', req.params.id);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
  });