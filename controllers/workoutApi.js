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
    res.json(exercise);
    }catch(err) {
    res.status(500).json(err);
}})

//get workouts
router.get("/api/workouts", async (req, res) =>{
    try{
    const lastWorkout = await db.Workout.aggregate([
    {$addFields: {totalDuration: 
      {$sum:`$exercises.duration`}
    }}])
    res.json(lastWorkout);
    }catch(err) {
      res.status(500).json(err);
    };
});

//get workout history

router.get("/api/workouts/range", async (req, res) =>{
  try{
  const pastWorkouts = await db.Workout.aggregate([
  {$sort: {day: -1}},
  {$addFields: {totalDuration: 
    {$sum:`$exercises.duration`}
  }}]).limit(7)
  res.json(pastWorkouts);
  }catch(err) {
    res.status(500).json(err);
  };
});

module.exports = router;

