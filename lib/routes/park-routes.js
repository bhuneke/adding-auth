const express = require('express');
const Router = express.Router;
const parkRouter = Router();
const Park = require('../models/park-schema');
const bodyParser = require('body-parser').json();

parkRouter
    .get('/', (req, res, next) => {
        const query = {};
        if (req.query.type) {
            query.type = req.query.type;
        }
        Park.find(query)
            .then(parks => res.send(parks))
            .catch(next);
    })
    .post('/', bodyParser, (req, res, next) => {
        new Park(req.body).save()
            .then(park => {res.send(park);})
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        let id = req.params.id;
        Park.findById(id)
            .then(park => {
                if(!park) {
                    res.status(404).send({error: `Cannot Find ${id}`});
                } else {
                    res.send(park);
                }
            })
            .catch(next);
    });


module.exports = parkRouter;