const userService = require('../services/userService');

//Register
exports.registerController = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json({
            success: true,
            message: 'Successfully Register',
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error is Registrations',
            error
        });
    }
};
//Login
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password',
            })
        }
        const {token, userName, address, phone} = await userService.loginUser({ email, password });
        res.status(200).json({
            success: true,
            message: 'Successfully Login',
            user:{userName, email, address, phone},
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error in Login',
            error
        });
    }
};

exports.testController = async (req, res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        res.send({error});
    }
}