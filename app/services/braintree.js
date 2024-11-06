const braintree = require("braintree");
const { promisify } = require("util");

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANT_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY
});

const generateToken = promisify(gateway.clientToken.generate).bind(gateway);
const createBraintreeCustomer = promisify(gateway.customer.create).bind(gateway);

// Generate a client token with the provided customer ID
async function generateClientToken(aCustomerId) {
    try {
        const response = await generateToken({ customerId: aCustomerId });
        return response.clientToken;
    } catch (error) {
        console.error("Error generating client token:", error.message);
        throw error;
    }
}

// Create a customer with the provided payload
async function createCustomer(payload) {
    try {
        const response = await createBraintreeCustomer(payload);
        return response?.customer;
    } catch (error) {
        console.error("Error creating customer:", error.message);
        throw error;
    }
}

module.exports = {
    generate_client_token: async () => {
        try {
            const clientToken = await generateClientToken('56607047249');
            return clientToken;
        } catch (e) {
            console.error("generate_client_token error:", e.message);
            throw e;
        }
    },

    create_customer: async (payload) => {
        try {
            return await createCustomer(payload);
        } catch (e) {
            console.error("create_customer error:", e.message);
            throw e;
        }
    }
};
