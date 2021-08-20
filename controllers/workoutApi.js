const router = require('express').Router();
const db = require('../models')

// get most recent workout and aggregate sums total duration
router.get('/', async(req, res) => {
    const lastWorkout = await db.Workout.aggregate([
        {
            $sort:{day:-1}
        },
        {
            $addFields:{ totalDuration: {$sum = '$exercises.duration'}}
        }
    ]);

    res.json(lastWorkout)

});

router.get('/range')