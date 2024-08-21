const { createOrder } = require('../services/paymentService');

exports.checkOut = async (req, res) => {
    try {
        const { amount, currency = 'INR', receipt } = req.body;
        const order = await createOrder(amount, currency, receipt);
        res.status(200).json(order);
    } catch (error) {
        console.error('Error in createOrder controller:', error);
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
};