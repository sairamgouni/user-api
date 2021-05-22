var loginUser = require('../model/loginUser');
var paramValidator = require('../validators/paramValidator');

let userController = {
    listAllUser(req, res) {
        loginUser.listUser().then(response => {
            return res.status(200).json(response);
        }).catch(error => {
            return res.status(500).json(error);
        })
    },
    listUser(req, res) {
        userID = req.query.userId
        loginUser.User(userID).then(response => {
            return res.status(200).json(response);
        }).catch(error => {
            return res.status(500).json(error);
        })
    }
};
module.exports = userController;
