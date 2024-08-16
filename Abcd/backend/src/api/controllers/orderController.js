const { createOrder } = require('../services/razorpayService');

exports.createOrder = async (req, res) => {
    try {
        const { amount, currency = 'INR', receipt } = req.body;
        if (amount * 100 > 100000000) { 
            return res.status(400).json({ error: 'Amount exceeds maximum allowed limit.' });
        }
        const order = await createOrder(amount * 100, currency, receipt);
        console.log("Order", order);
        res.status(200).json(order);
    } catch (error) {
        console.error('Error in createOrder controller:', error);
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
};