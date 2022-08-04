const router = require('express').Router();
const apiRoutes = require('./api');
const mainRoutes = require('./main-routes');
const dashRoutes = require('./dash-routes');

router.use('/', mainRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashRoutes);

module.exports = router;