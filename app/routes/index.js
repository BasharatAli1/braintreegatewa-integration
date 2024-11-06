const router = require('express').Router();

// brain-tree routes
router.use(require('./braintree/braintree.routes'));

router.use('/', function (req, res, next) {
	res.statusMessage = "No Route Found";
	res.status(404).end();
});

module.exports = router;