const User = require('../model/userModel');

let loginController =
{
    async Login(req, res) {
        try {
            let loginDetails = await User.LoginAttempt(req.body.email, req.body.password ,function (result) {
                return res.json(result);
            });

        } catch (err) {
            return res.json({
                msg: "Wrong Email or Password"
            });
        }

    }
};
module.exports = loginController;
