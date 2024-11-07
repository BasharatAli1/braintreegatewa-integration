
    // Fetch the client token from server
    fetch('http://127.0.0.0:3000/api/client_token')
    .then(response => response.text())
    .then(clientToken => {
        console.log(JSON.parse(clientToken).client_token);
        const token = JSON.parse(clientToken).client_token;
        
        braintree.dropin.create({
        authorization: token,
        container: '#dropin-container'
        }, (err, dropinInstance) => {
        if (err) {
            console.error('braintree.dropin.create ERR:', err);
            return;
        }

        console.log('braintree.dropin.create dropinInstance :::', dropinInstance);
        // Handle payment submission
        const submitButton = document.getElementById('submit-button');
        submitButton.addEventListener('click', () => {
            // Get custom field values
            const fullName = document.getElementById('full-name').value.trim();
            const amount = document.getElementById('amount').value.trim();
            const productName = document.getElementById('product-name').value.trim();
            const productQty = document.getElementById('product-qty').value.trim();
            const currency = document.getElementById('currency').value;

            // Validate fields
            if (!fullName || !amount || !productName || !productQty || !currency) {
                alert('Please fill in all fields.');
                return;
            }

            dropinInstance.requestPaymentMethod((err, payload) => {
            if (err) {
                console.error('Request Payment Method :::', err);
                return;
            }

            // console.log('Request Payment Method payload:::', payload);
                    // Send the payload nonce and custom fields to server
            fetch('http://127.0.0.0:3000/api/checkout', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    paymentMethodNonce: payload.nonce,
                    fullName: fullName,
                    amount: amount,
                    productName: productName,
                    productQty: productQty,
                    currency: currency
                //     "creditCard": {
                //         "number": `${payload.details.bin}${payload.details.lastFour}`,
                //         "expirationMonth": payload.details.expirationMonth,
                //         "expirationYear": payload.details.expirationYear,
                //         "cvv": "111"
                //   }
            })
            })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                alert('Payment successful!');
                } else {
                alert('Payment failed' + (response.message ? (': ' + response.message) : ''));
                }
            });
            });
        });
        });
    })
    .catch(error => console.error('Failed to fetch client token:', error));