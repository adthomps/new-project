// Define your configuration
const config = {
    profileId: 'aptmarch2023',
    accessKey: '24889401-6084-4a4a-a6c1-977e87adedb6',
    paymentMethod: 'card',
    amount: 1000, // Amount in cents (e.g., $10.00)
    currency: 'USD',
    locale: 'en-US',
    returnUrl: 'https://yourwebsite.com/success',
    cancelUrl: 'https://yourwebsite.com/cancel',
};

// Initialize CyberSource
cybersourceSecure.create(config);

// Add an event listener to the checkout button
document.getElementById('checkoutButton').addEventListener('click', () => {
    // Start the checkout process
    cybersourceSecure.checkout().then((response) => {
        // Handle the response, e.g., redirect to the hosted checkout page
        window.location.href = response.redirectUrl;
    }).catch((error) => {
        console.error('Checkout error:', error);
    });
});
