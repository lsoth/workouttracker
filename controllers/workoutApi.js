const router = require('express').Router();
const db = require('../models')

//post a workout
router.post("/workouts", ({ body }, res) => {
  console.log('H');
    db.Workout.create(body)
      .then(dbWorkout => {
        console.log(dbWorkout);
        res.json(dbWorkout);
      })
      .catch(err => {
        console.error(err)
        res.json(err);
      });
});

//post many workouts
router.post("/workouts/bulk", ({ body }, res) => {
    db.Workout.insertMany(body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
});

//update a workout
router.put("/workouts/:id", async (req, res) => {
    try{
    const exercise = await db.Workout.updateOne(
        {'_id': req.params.id},
        {$push: {exercises: req.body}}
    );
    res.json(exercise);
    }catch(err) {
    res.json(err);
}})

//get workouts
router.get("/workouts", async (req, res) =>{
    try{
    const lastWorkout = await db.Workout.aggregate([
    {$addFields: {totalDuration: 
      {$sum:`$exercises.duration`}
    }}])
    res.json(lastWorkout);
    }catch(err) {
      res.json(err);
    };
});

//get workout history

router.get("/workouts/range", async (req, res) =>{
  try{
  const pastWorkouts = await db.Workout.aggregate([
  {$sort: {day: -1}},
  {$addFields: {totalDuration: 
    {$sum:`$exercises.duration`}
  }}]).limit(7)
  res.json(pastWorkouts);
  }catch(err) {
    res.json(err);
  };
});

module.exports = router;

