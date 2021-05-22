// import {AxiosRequestConfig as req} from "axios";

const mysql = require('mysql');
const config = require('../config/config');
const jwt = require('../config/jwt');
const HttpStatus = require('http-status-codes');
const jwtToken = require('jsonwebtoken');
const md5 = require('md5');



const connection = mysql.createConnection(config);

/**
 * @typedef {Object} User
 * @property id
 * @property phone
 * @property email
 * @property password
 * @property isVerified
 */
class userModel {
    /**
     * Attempt to sign in the user with the following email and password
     *
     * @function User.LoginAttempt
     * @param {string} email
     * @param {string} password
     * @returns {{user: User, token: Token.token, refreshToken: RefreshToken.refreshToken}}
     * @throws {Error}
     */
    static async LoginAttempt(email, password,callback) {
        var post = {
            password: md5(password),
            email: email
        }
        var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";

        var table = ["user", "password", post.password, "email", post.email];

        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                return { "Error": true, "Message": "Error executing MySQL query" };
            }
            else {

                if (rows.length == 1) {
                    var user = {
                        id: rows[0].id,
                    }
                    var token = jwtToken.sign(user, 'test1234', {
                        expiresIn: 1440
                    });
                    var userData = {
                        token:token,
                        id: rows[0].id,
                        name:rows[0].name,
                        email:rows[0].email,
                        role:rows[0].role
                    }

                    connection.query(query, userData, function (err, rows) {
                        if (err) {
                            throw new Error('An error occurred');
                        } else {
                            return callback(userData);
                        }
                    });
                }
                else {
                    connection.query(query, function (err, rows) {
                        if (err) {
                            throw new Error('An error occurred');
                        } else {
                            return callback({ "status": "fail", "msg": "wrong Username or Password" });
                        }
                    });

                }

            }
        });

    }
    static async User(userId,callback,params) {
        var query = "SELECT * FROM ?? WHERE ??=?";

        var table = ["user", "id",params.userId];

        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                return { "Error": true, "Message": "Error executing MySQL query" };
            }
            else {

                if (rows.length == 1) {
                    var userData = {
                        name:rows[0].name,
                        email:rows[0].email,
                        role:rows[0].role
                    }

                    connection.query(query, userData, function (err, rows) {
                        if (err) {
                            throw new Error('An error occurred');
                        } else {
                            return callback(userData);
                        }
                    });
                }
                else {

                    connection.query(query, function (err, rows) {
                        console.log(err, rows, "#$#$")
                        if (err) {
                            throw new Error('An error occurred');
                        } else {
                            return callback({ "status": "fail", "msg": "wrong Username or Password" });
                        }
                    });

                }

            }
        });

    }



}

/**
 * @class User
 */
module.exports = userModel;
