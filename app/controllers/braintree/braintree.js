const braintreeService = require('../../services/braintree');

module.exports.generate_client_token = async function (req, res, next) {
	try {
        const token = await braintreeService.generate_client_token();
		return res.json({ client_token: token });
	} catch (e) {
        console.log('ERR :::', e);
		return next(e);
	}
};

module.exports.create_customer = async function (req, res, next) {
	try {
        const customer = await braintreeService.create_customer(req.body, req.query);
		return res.json({ customer });
	} catch (e) {
        console.log('ERR :::', e);
		return next(e);
	}
};

module.exports.checkout = async function (req, res, next) {
	try {
        const response = await braintreeService.checkout(req.body);
		return res.send(response);
	} catch (e) {
        console.log('ERR :::', e);
		return next(e);
	}
};
