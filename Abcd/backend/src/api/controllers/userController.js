const userService = require('../services/userService');

//Register
exports.register = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
//Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, userName } = await userService.loginUser({ email, password });
        res.status(200).json({ token, userName });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};