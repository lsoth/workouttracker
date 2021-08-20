const router = require('express').Router();
const path = require('path');
const Workout = require('../models/Workout.js');

router.get('/',(req, res)=> {
    res.sendFile.apply(path.join(__dirname, '../public/index.html'))
});
router.get('/stats',(req, res)=> {
    res.sendFile.apply(path.join(__dirname, '../public/stats.html'))
});
router.get('/exercise',(req, res)=> {
    res.sendFile.apply(path.join(__dirname, '../public/index.html'))
});

module.exports = router;