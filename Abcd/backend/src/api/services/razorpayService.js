const Razorpay = require('razorpay');

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (amount, currency, receipt) => {
    try {
        const options = {
            amount: Math.round(amount), 
            currency,
            receipt,
        };
        return await razorpayInstance.orders.create(options);
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

module.exports = {
    createOrder,
};
