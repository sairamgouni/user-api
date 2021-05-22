const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');
const config = require('../config/config');
const connection = mysql.createConnection(config);
var loginController = require('../controller/loginController');
var userController = require('../controller/userController');
var tokenController = require('../controller/tokenController');


router.get('/allUsers',userController.listAllUser);
router.get('/User?',userController.listUser);

router.post('/login', loginController.Login);



module.exports = router;
