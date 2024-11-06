const express = require('express');
const braintreeController = require('../../controllers/braintree/braintree');
const router = express.Router();

router.get(
    '/client_token',
    braintreeController.generate_client_token
);

router.post(
    '/customer',
    braintreeController.create_customer
);

module.exports = router;
