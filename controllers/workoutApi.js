const router = require('express').Router();
const db = require('../models')

//post a workout
router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(500).json(err);
      });
});

//post many workouts
router.post("/api/workouts/bulk", ({ body }, res) => {
    db.Workout.insertMany(body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(500).json(err);
      });
});

//update a workout
router.put("/api/workouts/:id", async (req, res) => {
    try{
    const exercise = await db.Workout.updateOne(
        {'_id': req.params.id},
        {$push: {exercises: req.body}}
    );
    res.json(exercise)
}   catch(err) {
    res.status(500).json(err)
}})
//get workouts
router.get("/api/workouts", (req, res) =>{
    db.Workout.aggregate([
    { $sort: {day: -1}},
    { $addFields: {totalDuration: "$exercise.duration" }}])
    .then(lastWorkout => {
        res.json(lastWorkout)
    }).catch(err => {
        res.status(500).json(err);
    });
});

//get workout history for past week

// router.get("/api/workouts/range")


module.exports = router;

