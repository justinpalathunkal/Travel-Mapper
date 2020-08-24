/* eslint-disable */
const { Router } = require('express');

const LogEntry = require('../models/LogEntry');

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const entries = await LogEntry.find();
        res.json(entries);
    } catch (error) {
        next(error);
    }
 
});

router.post('/', async (req, res, next) => {
    try {
        const logEntry = new LogEntry(req.body);
        const createdEntry = await logEntry.save();
        res.json(createdEntry);
    } catch (error) {
        console.log(error.constructor.name);
        if (error.constructor.name === 'ValidationError') {
            res.status(422);
        }

        next(error);
    }
router.delete('/:id', async (req, res) => {
    try {
        // LogEntry.findById(req.params.id)
        // .then(logEntry=> logEntry.remove())
        // .then(() => res.status(101).json({success}))
        LogEntry.findById(req.params.id)
        .then(logEntry => LogEntry.remove())
        .then(() => res.status(101).json({success}.json(LogEntry)))
    } catch {
        res.status(404).json({success: false});
    }
});
    
});

module.exports = router;