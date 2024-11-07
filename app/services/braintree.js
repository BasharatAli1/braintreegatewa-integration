
const braintree = require("braintree");
const db = require('../../database/config');

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANT_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY
});

module.exports.generate_client_token = async () => {
    try {
        const clientToken = await generate_client_token('56607047249', gateway);
		return clientToken;
    } catch (e) {
        console.log("generate_client_token err: ", e.message);
    }
};

module.exports.create_customer = async (payload, params) => {
    try {
        const response = await create_customer(payload, gateway);
        
		return response?.customer;
    } catch (e) {
        console.log("create_customer err: ", e.message);
    }
};


module.exports.checkout = async (payload) => {
    try {
        const { Order } = db;
        const productName = payload.productName;
        const productQty = payload.productQty;
        const fullName = payload.fullName;
        const currency = payload.currency;
        delete payload.productName;
        delete payload.productQty;
        delete payload.fullName;
        delete payload.currency;
        const response = await checkout(payload, gateway);
        Order.create({ amount: payload.amount, productName, productQty, fullName, currency, transactionInfo: response });
		return response;
    } catch (e) {
        console.log("checkout err: ", e.message);
        throw e;
    }
};


async function generate_client_token(aCustomerId, gateway) {
    try {
        const response = await new Promise((resolve, reject) => {
            gateway.clientToken.generate({ customerId: aCustomerId }, (err, response) => {
                if (err) reject(err);
                else resolve(response);
            });
        });
        
        // Access the clientToken
        const clientToken = response.clientToken;
        return clientToken;
    } catch (error) {
        console.error("Error generating client token:", error);
        throw error;
    }
}

async function create_customer(data, gateway) {
    try {
        const response = await new Promise((resolve, reject) => {
            gateway.customer.create(data, (err, response) => {
                if (err) reject(err);
                else resolve(response);
            });
        });
        
        return response;
    } catch (error) {
        console.error("Error creating customer:", error);
        throw error;
    }
}
// Create a transaction with the provided payload
async function checkout(payload) {
    try {
        const response = await new Promise((resolve, reject) => {
            gateway.transaction.sale(payload, (err, response) => {
                if (err) reject(err);
                else resolve(response);
            });
        });
        return response;
    } catch (error) {
        console.error("Error checkout:", error.message);
        throw error;
    }
}