const router = require('express').Router();

router.use('/', function (req, res, next) {
	res.statusMessage = "No Route Found";
	res.status(404).end();
});

module.exports = router;