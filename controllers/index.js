const router = require('express').Router();
const workoutApi = require('./workoutApi');
const homeRoutes = require('./homeRoutes');

router.use('/api', workoutApi);
router.use('/', homeRoutes);

module.exports = router;