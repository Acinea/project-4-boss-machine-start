const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db')

ideasRouter.param('id', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
});

//Get all ideas
ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'))
})

//Get single idea by Id.
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea)
});

//Create new idea
ideasRouter.post('/', (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
})


//Update idea
ideasRouter.put('/:ideaId', (req, res, next) => {
    let updatedIdeaInstance = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdeaInstance);
  });

//Delete idea
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.id);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
  });